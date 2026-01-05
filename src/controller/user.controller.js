import userService from "../services/user.service.js";
import catchAsync from "../utils/catchAsync.js";

export const inviteUser = catchAsync(async () => {
  const { email, role } = req.body;
  const result = await userService.invite({
    email,
    role,
    tenantId: req.tenantId,
    invitedBy: req.user.id,
  });

  res.json({ message: "Invited SuccessFully" });
});
