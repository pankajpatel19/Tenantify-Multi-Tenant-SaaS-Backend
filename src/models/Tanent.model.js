import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
    isActive: {
      type: Boolean,
      default: true,
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

tenantSchema.pre("find", excludeDeleted);
tenantSchema.pre("findOne", excludeDeleted);
tenantSchema.pre("findOneAndUpdate", excludeDeleted);
tenantSchema.pre("countDocuments", excludeDeleted);

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;
