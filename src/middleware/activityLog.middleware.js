import Activity from "../utils/logActivity.js";

export const log = (options) => {
  return (req, res, next) => {
    res.on("finish", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        Activity({
          req,
          action: options.action,
          entity: options.entity,
          entityId: options.entityId ? req[options.entityId] : null,
          meta: options.meta || {},
        });
      }
    });
    next();
  };
};
