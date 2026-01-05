import redisConnection from "../config/redis.config.js";

const MAX_WINDOW = 15 * 60;
const MAX_COUNT = 5;

const loginRateLimiter = async (req, res, next) => {
  try {
    const { email } = req.body;
    const ip = req.ip;

    if (!email) return next();

    const key = `login:${email}:${ip}`;

    const attempt = await redisConnection.get(key);

    if (attempt && attempt >= MAX_COUNT) {
      return res
        .status(429)
        .json({ message: "To many Login Attempt ! try after 15 min " });
    }

    const newAttempt = await redisConnection.incr(key);

    if (newAttempt === 1) {
      await redisConnection.expire(key, MAX_WINDOW);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default loginRateLimiter;
