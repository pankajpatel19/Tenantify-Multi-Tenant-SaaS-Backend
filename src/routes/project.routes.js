import { Router } from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { allowRole, can } from "../middleware/rbac.middleware.js";
import {
  createProject,
  deleteProject,
  getProduct,
  PermanentDelete,
  restore,
} from "../controller/project.controller.js";
import { tenantMiddleware } from "../middleware/tanant.middleware.js";
import tenantRateLimiter from "../rate-limits/tenantRateLimiter.js";
import { log } from "../middleware/activityLog.middleware.js";

const router = Router();
router.use(tenantRateLimiter);

router.post(
  "/create-project",
  authmiddleware,
  tenantMiddleware,
  log({ action: "CREATE", entity: "PROJECT" }),
  allowRole("admin", "owner"),
  createProject
);

router.get("/project/:id", authmiddleware, tenantMiddleware, getProduct);

router.delete(
  "/delete-project",
  authmiddleware,
  tenantMiddleware,
  can("DELETE_PROJECT"),
  deleteProject
);

router.get(
  "/project/:id/restore",
  authmiddleware,
  tenantMiddleware,
  allowRole("admin"),
  restore
);

router.delete(
  "/project/:id/permanent",
  authmiddleware,
  tenantMiddleware,
  allowRole("owner"),
  PermanentDelete,
  log({ action: "PERMANENT_DELETE", entity: "PROJECT" })
);
export default router;
