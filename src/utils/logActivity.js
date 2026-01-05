import ActivityLog from "../models/Activity.model.js";

async function Activity(req, action, entity, entityId = null, meta = {}) {
  try {
    await ActivityLog.create({
      tenantId: req.user?.tenantId,
      userId: req.user?.id,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      action,
      entity,
      entityId,
      meta,
    });
  } catch (error) {
    console.log("Activity Log Error : ", error);
  }
}

export default Activity;
