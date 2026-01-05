import AppError from "../utils/AppError.js";

export const tenantMiddleware = (req, res, next) => {
  if (!req.user?.tenantId) {
    return next(new AppError("Tenant context missing", 403));
  }
  req.tenantId = req.user.tenantId;

  if (req.body?.tenantId) delete req.body.tenantId;
  if (req.query?.tenantId) delete req.query.tenantId;

  next();
};
