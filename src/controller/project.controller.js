import Tenant from "../models/tanent.model.js";
import projectService from "../services/project.service.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const createProject = catchAsync(async (req, res) => {
  const product = await projectService.createProduct({
    tenantId: req.tenantId,
    ...req.body,
    createdBy: req.user,
  });

  if (!product) {
    return next(new AppError("Project Not Found", 404));
  }

  res.status(201).json({ message: "Product Created", product });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await projectService.getProduct({
    _id: req.user.id,
    tenantId: req.tenantId,
  });
  if (!product) {
    return next(new AppError("Project Not Found", 404));
  }
  res.status(201).json({ message: "success", product });
});

export const deleteProject = catchAsync(async (req, res) => {
  const deletedProject = await projectService.deleteProject({
    userId: req.user?.id,
    tenantId: req.user?.tenantId,
    projectId: req.params,
  });
  res
    .status(200)
    .json({ message: "Project Deleted SuccessFully", deleteProject });
});

export const restore = catchAsync(async (req, res) => {
  const restoreData = await projectService.restoreProject({
    tenantId: req.user.tenantId,
    _id: req.params.id,
  });
  res
    .status(200)
    .json({ message: "Project Restore SuccessFully", restoreData });
});

export const PermanentDelete = catchAsync(async (req, res) => {
  const data = await projectService.PermanentDelete({
    _id: req.params.id,
    tenantId: req.user?.tenantId,
  });

  res.status(200).json({ message: "Project Delted SuccessFully", data });
});
