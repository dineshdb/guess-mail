import { EmailGuesser } from "../src";

test("Reverse names", () => {
  const emailGuesser = new EmailGuesser();
  emailGuesser.update([
    {
      name: "John Doe",
      email: "doe_john@example.com",
    },
    {
      name: "John Doe",
      email: "john.d@example.com",
    },
    {
      name: "John Doe",
      email: "doe_john@example.com",
    },
  ]);
  expect(emailGuesser.guess("Johhny Does", "example.com")).toEqual(
    "does_johhny@example.com",
  );
});
