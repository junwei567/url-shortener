import { createHash } from "crypto";
import validURL from "valid-url";
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

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


const customConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: "-",
  length: 2,
};

export function getReadableName():string {
  return uniqueNamesGenerator(customConfig);
}