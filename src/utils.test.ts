import { getFormat } from "./utils";

test("get format", () => {
  expect(getFormat("John Doe", "john.doe@example.com")).toEqual(
    "fn.ln",
  );
  expect(getFormat("John Doe", "john.d@example.com")).toEqual(
    "fn.li",
  );
  expect(getFormat("John Doe", "j.doe@example.com")).toEqual(
    "fi.ln",
  );
  expect(getFormat("John M Doe", "j.doe@example.com")).toEqual(
    "fi.ln",
  );
  expect(getFormat("John M. Doe", "j.m@example.com")).toEqual("fi.mi");
  expect(getFormat("John M Doe", "j_m@example.com")).toEqual("fi_mi");
});
