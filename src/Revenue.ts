import CallXML, { type XMLResult } from "./CallXML.ts";
import type { JsonBase } from "./JsonBase.ts";
import type { Repository } from "./Repository.ts";
import type { DavPropStat, DavResponse } from "./WebDav.ts";

/**
 * "Revenue" is an intuitive object designed to facilitate
 * the automated collection of information from the Federal Revenue Service;
 * it is designed to simplify the handling of various types
 * of data and the automated retrieval of data from the Federal Revenue Service's
 * public portal.
 */
class Revenue {
  private JsonBase: JsonBase;
  private XMLParser: Bun.XML.Document;
  private ReferenceURL: URL;

  constructor({ link, content }: XMLResult) {
    this.XMLParser = Bun.XML.parse(content);
    this.ReferenceURL = link;
    this.JsonBase = JSON.parse(JSON.stringify(this.XMLParser, null, 2));
  }

  static async load(call: CallXML = new CallXML()): Promise<Revenue> {
    return new Revenue(await call.request());
  }

  async writeJsonResponse(path: string) {
    return await Bun.write(path, JSON.stringify(this.JsonBase));
  }

  resource(): Repository[] {
    const raw: DavResponse | DavResponse[] =
      this.JsonBase["d:multistatus"]["d:response"];

    const responses: DavResponse[] = Array.isArray(raw) ? raw : [raw];

    const repos: Repository[] = responses.flatMap((r) => {
      const href = r["d:href"].trim();
      const propstat = r["d:propstat"];

      const stat: DavPropStat = Array.isArray(propstat)
        ? (propstat.find((p) => p["d:status"].includes("200")) ?? propstat[0]!)
        : propstat;

      const prop = stat["d:prop"];
      const lengthStr = prop["d:getcontentlength"];
      const bytes = lengthStr ? Number(lengthStr) : undefined;

      const resType = prop["d:resourcetype"];
      const isDirectory =
        typeof resType === "object" && "d:collection" in resType;

      return [
        {
          name: prop["d:displayname"].trim(),
          date: new Date(prop["d:getlastmodified"]),
          url: this.ReferenceURL.origin + href,
          status: stat["d:status"].trim(),
          isFile: !isDirectory,
          bytes,
          formatBytes() {
            if (this.bytes === undefined) return "-";
            const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            let value = this.bytes;
            let i = 0;
            while (value >= 1024 && i < units.length - 1) {
              value /= 1024;
              i++;
            }
            return `${value.toFixed(2)} ${units[i]}`;
          },
        },
      ];
    });

    return repos.filter((r) => r.name !== "CNPJ");
  }

  directorys(): Repository[] {
    return this.resource().filter((r) => !r.isFile);
  }

  files(): Repository[] {
    return this.resource().filter((r) => r.isFile);
  }

  recentDirectory(): Repository | undefined {
    return this.directorys().reduce<Repository | undefined>(
      (max, cur) => (!max || cur.date > max.date ? cur : max),
      undefined,
    );
  }

  recentFile(): Repository | undefined {
    return this.files().reduce<Repository | undefined>(
      (max, cur) => (!max || cur.date > max.date ? cur : max),
      undefined,
    );
  }

  groupFiles(): Partial<Record<string, Repository[]>> {
    const files = this.files();

    const grupos = Object.groupBy(files, (r) =>
      r.name.replace(/\d+/g, "").replace(".zip", "").toLowerCase().trim(),
    );

    return grupos;
  }
}

export default Revenue;
