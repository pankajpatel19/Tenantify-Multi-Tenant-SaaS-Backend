import { log } from "../middleware/activityLog.middleware.js";
import Project from "../models/Project.model.js";
import AppError from "../utils/AppError.js";

class ProjectService {
  async createProduct(data) {
    return Project.create(data);
  }

  async getProduct(tenantId) {
    return Project.find({ _id, tenantId });
  }

  async deleteProject(projectId, tenantId, id) {
    const project = await Project.findOne({ projectId, tenantId });

    if (!project) {
      throw new AppError("Project Not Found", 404);
    }

    project.isDeleted = true;
    project.deletedOn = Date.now();
    project.deletedBy = id;
    await project.save();
    return project;
  }

  async restoreProject({ _id, tenantId }) {
    const restore = await Project.findOne({
      _id,
      tenantId,
      isDeleted: true,
      withDeleted: true,
    });

    if (!restore) {
      throw new AppError("Project Not FOund", 404);
    }

    restore.isDeleted = false;
    restore.deletedBy = null;
    restore.deletedOn = null;

    await restore.save();

    await log({
      req,
      action: "RESTORE",
      entity: "PROJECT",
      entityId: project._id,
    });

    return restore;
  }

  async PermanentDelete({ _id, tenantId }) {
    const project = await Project.findOne(
      { _id, tenantId },
      { withDeleted: true }
    );

    if (!project) {
      throw new AppError("Project Not Found", 404);
    }

    if (!project.isDeleted) {
      throw new AppError("Project Not Found", 404);
    }

    await Project.findOneAndDelete({ id, tenantId });
  }
}

export default new ProjectService();
