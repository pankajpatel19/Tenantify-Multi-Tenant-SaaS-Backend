import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedOn: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

function excludeDeleted(next) {
  if (this.getFilter()?.withDeleted) {
    delete this.getFilter().withDeleted;
    return next();
  }

  this.where({ isDeleted: false });
  next();
}

Task.pre("find", excludeDeleted);
Task.pre("findOne", excludeDeleted);
Task.pre("findOneAndUpdate", excludeDeleted);
Task.pre("countDocuments", excludeDeleted);

const Task = mongoose.model("Task", taskSchema);
export default Task;
