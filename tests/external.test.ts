import { readFileSync } from "fs";

import { EmailGuesser, NameEmailPair } from "../src/index";

function filterComments(input: string) {
  return input.length !== 0 &&
    !input.startsWith("#") &&
    !input.startsWith("//");
}

const filterEmptyLine = (input: string) => input && input.trim().length !== 0;

function mapToType(entry: string): NameEmailPair {
  const [name, email] = entry.split(",");
  return { name: name.trim(), email: email.trim() };
}

const history = readFileSync("tests/input.csv", "utf-8");
const entries = history.split("\n")
  .filter(filterEmptyLine)
  .filter(filterComments)
  .map(mapToType);
test("all statistics", () => {
  const emailGuesser = new EmailGuesser();
  emailGuesser.update(entries);
  expect(emailGuesser.domainFormat("ownbackup.com")).toEqual("fn.ln");
  expect(emailGuesser.domainFormat("experitest.com")).toEqual("fn");
  expect(emailGuesser.domainFormat("optimove.com")).toEqual("fn_ln");
  expect(emailGuesser.domainFormat("viber.com")).toEqual("fn");
});

test("all guesses", () => {
  const emailGuesser = new EmailGuesser();
  emailGuesser.update(entries);
  expect(emailGuesser.guess("John Doe", "ownbackup.com")).toEqual(
    "john.doe@ownbackup.com",
  );
  expect(emailGuesser.guess("John Doe", "experitest.com")).toEqual(
    "john@experitest.com",
  );
  expect(emailGuesser.guess("John Doe", "optimove.com")).toEqual(
    "john_doe@optimove.com",
  );
  expect(emailGuesser.guess("John Doe", "viber.com")).toEqual(
    "john@viber.com",
  );
});
