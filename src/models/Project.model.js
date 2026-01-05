import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Active", "Archived"],
      default: "Active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedOn: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

projectSchema.pre("find", excludeDeleted);
projectSchema.pre("findOne", excludeDeleted);
projectSchema.pre("findOneAndUpdate", excludeDeleted);
projectSchema.pre("countDocuments", excludeDeleted);

const Project = mongoose.model("Project", projectSchema);
export default Project;
