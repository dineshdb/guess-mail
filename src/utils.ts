export function getFormat(name: string, email: string): string {
  email = email.trim().toLowerCase();
  const [namePart] = email.split("@");
  let joiner = ".";
  const re = /(\.|_|-)/;
  if (namePart.indexOf("_") > -1) {
    joiner = "_";
  } else if (namePart.indexOf("-") > -1) {
    joiner = "-";
  }

  const emailParts = namePart.split(re);
  const nameParts = name.toLowerCase()
    .split(" ")
    .map((n) => n.trim())
    .filter((n) => n.length > 0);
  if (nameParts.length > 3 || emailParts.length > 3) {
    throw new Error("Only fn, mn and ln are supported.");
  }

  return expand(nameParts, emailParts).join(joiner);
}

function partType(
  nameContent: string,
  emailContent: string,
): "n" | "i" | null {
  if (nameContent === emailContent && nameContent.length > 1) {
    return "n";
  } else if (emailContent === nameContent.charAt(0)) {
    return "i";
  }
  return null;
}

function expand(names: string[], emails: string[]): string[] {
  let formats = [];
  for (const email of emails) {
    let namePart = "";
    for (let i = 0; i < names.length; i++) {
      namePart = partType(names[i], email);
      if (namePart) {
        namePart = i + namePart;
        break;
      }
    }
    if (namePart) {
      formats.push(namePart);
    }
  }
  formats = formats.map((f) => f.replace("0", "f"));
  if (names.length === 2) {
    formats = formats.map((f) => f.replace("1", "l"));
  } else {
    formats = formats.map((f) => f.replace("1", "m").replace("2", "l"));
  }
  return formats;
}
