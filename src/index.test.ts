import { EmailGuesser } from "./index";

const thirdParty = "thirdparty.com";

const history = [
  {
    name: "FN LN",
    email: "fn.ln@domain.com",
  },
  {
    name: "FN LN",
    email: "fn.ln@domain.com",
  },
  {
    name: "FN LN",
    email: "fn@domain.com",
  },
  {
    name: "FN LN",
    email: "fn@domain2.com",
  },
  {
    name: "FN LN",
    email: "fn.ln@domain2.com",
  },
  {
    name: "FN LN",
    email: "fn@domain2.com",
  },
];

test("get domain preference", () => {
  const emailGuesser = new EmailGuesser();
  emailGuesser.update(history);
  expect(emailGuesser.domainFormat("domain.com")).toEqual("fn.ln");
  expect(emailGuesser.domainFormat("domain2.com")).toEqual("fn");
});

test("guess email", () => {
  const emailGuesser = new EmailGuesser();
  emailGuesser.update(history);
  expect(emailGuesser.domainFormat("domain.com")).toEqual("fn.ln");
  expect(emailGuesser.guess("John Doe", "domain.com")).toEqual(
    "john.doe@domain.com",
  );
  expect(emailGuesser.guess("John Doe", "domain2.com")).toEqual(
    "john@domain2.com",
  );
  expect(emailGuesser.guess("John Doe", thirdParty)).toEqual(
    "john.doe@thirdparty.com",
  );
});
