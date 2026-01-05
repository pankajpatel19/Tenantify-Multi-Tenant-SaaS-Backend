import AppError from "../utils/AppError.js";

export const allowRole =
  (...allowRoles) =>
  (req, res, next) => {
    const currentRole = req.user?.role;

    if (!allowRoles.includes(currentRole)) {
      return next(new AppError("Access Denied", 403));
    }
    next();
  };

// config/permissions.js
export const permissions = {
  CREATE_PROJECT: ["Owner", "Admin"],
  DELETE_PROJECT: ["Owner"],
  VIEW_PROJECT: ["Owner", "Admin", "Member"],
};

export const can = (permission) => (req, res, next) => {
  const role = req.user.role;

  if (!permissions[permission].includes(role)) {
    return next(new AppError("Forbidden", 403));
  }
  next();
};
