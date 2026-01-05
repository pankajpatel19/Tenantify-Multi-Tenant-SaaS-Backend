import { Router } from "express";
import {
  acceptInvite,
  login,
  registertenant,
} from "../controller/auth.controller.js";
import loginRateLimiter from "../rate-limits/loginRateLimiter.js";
import tenantRateLimiter from "../rate-limits/tenantRateLimiter.js";

const router = Router();

router.post("/registertenant", registertenant);
router.post("/login", loginRateLimiter, login);
router.post("/invite-user/token", acceptInvite);

export default router;
