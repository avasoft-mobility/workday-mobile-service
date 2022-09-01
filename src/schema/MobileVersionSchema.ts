import mongoose from "mongoose";
import MobileVersionModel from "../models/MobileVersionModel";

const mobileVersionSchema = new mongoose.Schema({
  isrequired: {
    type: Boolean,
    required: true,
  },
  appid: {
    type: String,
    required: true,
  },
  latestversion: {
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
});

export default mongoose.model<MobileVersionModel>(
  "mobileAppVersions",
  mobileVersionSchema
);
