import { createHash } from "crypto";
import validURL from "valid-url";

export async function getHash(
  input: string,
): Promise<string | undefined> {
  if (!validURL.isHttpUri(input) && !validURL.isHttpsUri(input)) {
    return undefined;
  }
  const hash = createHash("sha512");
  hash.update(input);
  const result = hash.digest("hex");
  return result;
}