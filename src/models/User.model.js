import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["Owner", "Admin", "Member"],
      default: "Member",
    },
    status: {
      type: String,
      enum: ["Active", "Invited"],
      default: "Active",
    },
  },
  { timestamps: true }
);

/* email unique per tenant */
userSchema.index({ email: 1, tenantId: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;
