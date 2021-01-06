# Readme
Guess the emails when Full name and company domain are given.

This package tries to guess the preferred email format for given company and tries to guess the email.

## Usage
See [this example](tests/example.test.ts) and other tests for usage.

```ts
import { EmailGuesser } from "../src";

test("Reverse names", () => {
  const emailGuesser = new EmailGuesser();
  emailGuesser.update([
    {
      name: "John Doe",
      email: "doe_john@example.com"
    },
    {
      name: "John Doe",
      email: "john.d@example.com"
    },
    {
      name: "John Doe",
      email: "doe_john@example.com"
    },
  ]);
  expect(emailGuesser.guess("Johhny Does", "example.com")).toEqual(
    "does_johhny@example.com",
  );
})

```

## Features
- Different separators support: dot(.), underscore(_)
- Random name orders: john.doe, doe.john, etc.
- Delegation of database interface to user of the api.
- Strictly typed interface (for typescript users) as well as compatibility for js users.
- Optional middle name.
## Future Enhancements
- Support for email formats without separator e.g. jdoe@example.com, has been left out as future enhancement.

## Copyright
- Dinesh Bhattarai <dineshdb@dbhattarai.info.np>
## License
MIT