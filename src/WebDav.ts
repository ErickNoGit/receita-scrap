export interface DavProp {
  "d:displayname": string;
  "d:resourcetype": string | { "d:collection": string };
  "d:getlastmodified": string;
  "d:getcontentlength"?: string;
}

export interface DavPropStat {
  "d:prop": DavProp;
  "d:status": string;
}

export interface DavResponse {
  "d:href": string;
  "d:propstat": DavPropStat | DavPropStat[];
}
