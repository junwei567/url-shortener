import { Document } from "mongoose";

export default interface IUrl extends Document {
  short: string;
  long: string;
  hash: string;
}