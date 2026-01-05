import authService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";

export const registertenant = catchAsync(async (req, res) => {
  const data = await authService.registertenant(req.body);

  return res.status(201).json({ message: "User Created", data });
});

export const login = catchAsync(async (req, res) => {
  const data = await authService.login(req.body, req);

  return res.status(200).json({ message: "Login SuccessFully", data });
});

export const acceptInvite = catchAsync(async (req, res) => {
  const data = await authService.acceptInvite(req.body);
  res.json(data);
});
