import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    members: {
      type: Number,
      required: [true, "Members count is required"],
      min: [1, "Members must be at least 1"],
    },
  },
  {
    collection: "families",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Family = mongoose.model("Family", familySchema);

export default Family;
