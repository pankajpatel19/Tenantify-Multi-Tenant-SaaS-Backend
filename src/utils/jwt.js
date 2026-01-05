import jwt from "jsonwebtoken";

export const generateToken = ({ userId, tenantId, role }) => {
  return jwt.sign({ userId, tenantId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN || "15m",
  });
};

export const verifyToken = (payload) => {
  return jwt.verify(payload, process.env.JWT_SECRET);
};
