import mongoose, { Schema } from "mongoose";
import IUrl from "../interfaces/urls";

const UrlSchema: Schema = new Schema(
  {
    short: { type: String, required: true },
    long: { type: String, required: true },
    hash: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUrl>("url", UrlSchema);