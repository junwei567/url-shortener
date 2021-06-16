import { createHash } from "crypto";
import validator from "validator";

export async function getHash(
  input: string,
): Promise<string | undefined> {
  if (!validator.isURL(input)) {
    return undefined;
  }
  const hash = createHash("sha512");
  hash.update(input);
  const result = hash.digest("hex");
  return result;
}



/**
 * take in a link
 * check if valid link
 * get hashed link
 * take first 8 characters
 * check hash inside mongoDB
 * if not found, insert long url and new short url
 * if found, check whether the long url is equal
 * if equal, use the same short url
 * if not equal, take the next 8 characters (or take 9 characters?) of the prev generated hash
 * check if hash inside mongoDB (perhaps a while loop now?)
 *
 * give user the new short url
 */