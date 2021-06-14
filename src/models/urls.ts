import mongoose, { Schema } from "mongoose";
import IUrl from "../interfaces/urls";

const UrlSchema: Schema = new Schema(
  {
    short: { type: String, required: true },
    long: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

UrlSchema.post<IUrl>("save", function () {
  this.long = "new stuff";
})

export default mongoose.model<IUrl>("Url", UrlSchema);