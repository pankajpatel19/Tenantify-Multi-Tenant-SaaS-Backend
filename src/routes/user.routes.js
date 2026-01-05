import { Router } from "express";
import { inviteUser } from "../controller/user.controller.js";
import { tenantMiddleware } from "../middleware/tanant.middleware.js";
const router = Router();

router.post("/invite", tenantMiddleware, inviteUser);
export default router;
  