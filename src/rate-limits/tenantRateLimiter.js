import redisConnection from "../config/redis.config.js";

const tenantRateLimiter = async (req, res, next) => {
  try {
    const tenantId = req.user?.tenantId;

    if (!tenantId) return next();

    const tenantKey = `tenanat:${tenantId}`;

    const attempt = await redisConnection.get(tenantKey);

    if (attempt && attempt >= 100) {
      return res.status(429).json({
        message: "To many request on Tenanat ! try again in some times",
      });
    }

    const newAttempt = await redisConnection.incr(tenantKey);
    if (newAttempt === 1) {
      await redisConnection.expire(tenantKey, 60);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default tenantRateLimiter;
