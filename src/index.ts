import { getFormat } from "./utils";

export interface NameEmailPair {
  name: string;
  email: string;
}

interface Database {
  load(id: string): DomainStatistics;
  save(id: string, data: DomainStatistics);
}
interface DomainStatistics {
  [format: string]: number;
}

interface Statistics {
  [domain: string]: DomainStatistics;
}

export class EmailGuesser {
  private statistics: Statistics = {};
  private database: Database;

  constructor(database?: Database) {
    this.database = database;
  }

  update(history: NameEmailPair[]): void {
    for (const inputPair of history) {
      const nameDomainParts = inputPair.email.split("@");
      if (nameDomainParts.length !== 2) {
        throw new Error("Invalid email for " + JSON.stringify(inputPair));
      }
      const format = getFormat(
        inputPair.name,
        inputPair.email,
      );
      const [, domain] = nameDomainParts;

      const domainStatistics = this.statistics[domain] || {};
      domainStatistics[format] = (domainStatistics[format] || 0) + 1;
      this.statistics[domain] = domainStatistics;
    }
  }

  domainFormat(domain: string): string {
    const domainStats = this.statistics[domain];
    let preferredFormat;
    let max = 0;
    for (const key in domainStats) {
      if (domainStats[key] > max) {
        max = domainStats[key];
        preferredFormat = key;
      }
    }
    return preferredFormat;
  }

  /**
   * Save individual domain data to database
   * @throws database error
   * @param databaseId id of the data entry
   */
  save(domain: string): void {
    const data = this.statistics[domain];
    // Error handling is deferred to the user of this api.
    this.database.save(domain, data);
  }

  /**
   * @throws Database errors
   * @param domain
   */
  load(domain: string): void {
    this.statistics[domain] = this.database.load(domain) as DomainStatistics;
  }

  /**
	 *
	 * @param name Name of employee
	 * @param domain Company domain
	 */
  guess(name: string, domain: string): string {
    let [fn, mn, ln] = name.trim().toLowerCase().split(" ");
    if (!ln) {
      ln = mn;
      mn = "";
    }

    const domainFormat = this.domainFormat(domain) || "fn.mn.ln";
    return domainFormat.replace("fn", fn)
      .replace("fi", fn.charAt(0))
      .replace("ln", ln)
      .replace("li", ln.charAt(0))
      .replace("mn", mn)
      .replace("mi", mn.charAt(0))
      .replace("..", ".") + `@${domain}`;
  }
}
