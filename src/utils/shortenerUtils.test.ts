import { checkHttp } from "./shortenerUtils";

test("Checking checkHttp function: pass condition", () => {
  expect(checkHttp("https://www.google.com/")).toEqual(true);
});

test("Checking checkHttp function: fail condition", () => {
  expect(checkHttp("www.google.com/")).toEqual(false);
});