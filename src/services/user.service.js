import Invite from "../models/Invite.model.js";
import User from "../models/User.model.js";
import { addEmail } from "../Queue/email.queue.js";
import AppError from "../utils/AppError.js";

class UserSerive {
  async invite({ email, tenantId }) {
    const inviteuser = await User.findOne({ email, tenantId });

    if (inviteuser) {
      throw new AppError("User Already Exist", 401);
    }

    const token = crypto.randomBytes(32).toString("hex");

    await Invite.create({
      tenantId,
      email,
      token,
      role,
      expiresAt: Date.now(Date.now() + 24 * 60 * 60 * 1000),
    });

    const inviteLink = `${process.env.FRONT_URl}/invite-user/${token}`;
    await addEmail({ email: inviteuser.email, inviteLink });
    return true;
  }
}

export default new UserSerive();
