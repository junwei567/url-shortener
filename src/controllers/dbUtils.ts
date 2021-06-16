import mongoose from "mongoose";
import IUrl from "../interfaces/urls";
import Url from "../models/urls";

export async function getUrl(): Promise<IUrl[]> {
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
  hash: string
): Promise<IUrl | null> {
  try {
    const result = await Url.findOne({
      hash: hash
    }).exec();
    return result;
  } catch (err) {
    console.error("Error getting url", err);
    return err;
  }
}

export async function retrieveUrlFromHash(
  hash: string
): Promise<string | undefined> {
  try {
    const result = await Url.findOne({
      hash: hash
    }).exec();
    if (result) return result.long;
    else return undefined;
  } catch (err) {
    console.error("Error getting url", err);
    return err;
  }
}

export async function insertUrlEntry(
  hash: string,
  long: string,
  short: string,
): Promise<IUrl> {
  try {
    const url = new Url({
      _id: new mongoose.Types.ObjectId(),
      hash: hash,
      long: long,
      short: short,
    })
    return url.save();
  } catch (err) {
    console.error("Error getting url", err);
    return err;
  }
}