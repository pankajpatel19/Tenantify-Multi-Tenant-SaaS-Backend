import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";

export const authmiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("Login Required", 401));
  }
  const decoded = verifyToken(token);
  if (decoded) {
    req.user = {
      id: decoded.id,
      role: decoded.role,
      tenantId: decoded.tenantId,
    };
    next();
  } else {
    return res.status(404).json({ message: "User Not Found" });
  }
};
