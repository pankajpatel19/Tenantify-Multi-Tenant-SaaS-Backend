import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      enum: ["Create", "Update", "Delete", "Login", "LogOut", "Restore"],
    },
    entityType: {
      type: String,
      enum: ["Project", "Task", "User", "Tenant"],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    meta: {
      type: String,
    },
  },
  { timestamps: true }
);

activityLogSchema.index({ tenantId: 1, userId: 1 });

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;
