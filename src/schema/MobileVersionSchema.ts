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
  },
  { timestamps: true }
);

export default mongoose.model<MobileVersionModel>(
  "mobileAppVersions",
  mobileVersionSchema
);
