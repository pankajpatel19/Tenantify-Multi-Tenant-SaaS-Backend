import Tenant from "../models/tanent.model.js";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";
import Invite from "../models/Invite.model.js";
import AppError from "../utils/AppError.js";
import redisConnection from "../config/redis.config.js";
import logger from "../Logs/logger.js";

class AuthService {
  async registertenant({ companyName, name, email, password }) {
    const tenant = await Tenant.create({
      name,
      slug: companyName.toLowerCase().replace("/s+/g, " - ""),
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      tenantId: tenant._id,
      name,
      email,
      password: hashedPassword,
      role: "Owner",
    });

    tenant.ownerId = user._id;
    await tenant.save();

    const token = generateToken({
      userId: user._id,
      tenantId: tenant._id,
      role: user.role,
    });

    return {
      token,
      user: { id: user._id, name: user.name, role: user.role },
      tenant: {
        tenantId: tenant._id,
        name: tenant.name,
      },
    };
  }

  async login({ email, password }, req) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      logger.error("User email failed");
      throw new AppError("Invalid Credential", 404);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      logger.error({ id: user._id, message: "User password mismatch" });

      throw new AppError("Invalid Credential", 401);
    }

    logger.info({ id: user._id, message: "user logged in" });

    const key = `login:${email}:${req.ip}`;
    await redisConnection.del(key);

    const token = generateToken({
      userId: user._id,
      tenantId: user.tenantId,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
  }

  async acceptInvite({ token, name, password }) {
    const invite = await Invite.findOne({
      token,
      email,
      expiresAt: { $gt: new Date() },
    });

    if (!invite) {
      throw new AppError("invalid or expired session", 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      tenantId: user.tenantId,
      name,
      email: invite.email,
      password: hashedPassword,
      role: invite.role,
      status: "Active",
    });

    invite.accepted = true;
    await invite.save();

    const newtoken = generateToken({
      userId: user._id,
      role: user.role,
      tenantId: user.tenantId,
    });

    return {
      token: newtoken,
      user: {
        id: user._id,
        role: user.role,
      },
    };
  }
}
export default new AuthService();
