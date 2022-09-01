import mongoose from "mongoose";
import MobileVersionModel from "../models/mobileversionmodel";

const mobileVersionSchema = new mongoose.Schema(
  {
    isRequired: {
      type: Boolean,
      required: true,
    },
    appId: {
      type: String,
      required: true,
    },
    latestVersion: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  }
);

export default mongoose.model<MobileVersionModel>(
  "mobileAppVersions",
  mobileVersionSchema
);
