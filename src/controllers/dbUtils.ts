import mongoose from "mongoose";
import IUrl from "../interfaces/urls";
import Url from "../models/urls";

export async function getUrl(): Promise<any> {
  try {
    const result = await Url.find().exec();
    return result;
  } catch (err) {
    console.error("Error getting url", err);
    return err;
  }
}

export async function getLongUrl(
  long: string
): Promise<IUrl | null> {
  try {
    const result = await Url.findOne({
      long: long
    }).exec();
    return result;
  } catch (err) {
    console.error("Error getting url", err);
    return err;
  }
}

export async function getHashedUrl(
  url: string
): Promise<IUrl | null> {
  try {
    const result = await Url.findOne({
      short: url
    }).exec();
    return result;
  } catch (err) {
    console.error("Error getting url", err);
    return err;
  }
}

export async function insertUrlEntry(
  hash: string,
  long: string,
): Promise<any> {
  try {
    const url = new Url({
      _id: new mongoose.Types.ObjectId(),
      short: hash,
      long: long,
    })
    return url.save();
  } catch (err) {
    console.error("Error getting url", err);
    return err;
  }
}