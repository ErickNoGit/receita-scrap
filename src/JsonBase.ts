/**
 * JsonBase is type for XML translation.
 *
 */
export interface JsonBase {
  /**  d:multistatus is key basic response */
  "d:multistatus": {
    /**  @xmlns:d is additional value */
    "@xmlns:d": string;
    /**  @xmlns:s is additional value */
    "@xmlns:s": string;
    /**  @xmlns:oc is additional value */
    "@xmlns:oc": string;
    /**  @xmlns:nc is additional value */
    "@xmlns:nc": string;
    /**  d:response is directorys values for access */
    "d:response": {
      /** d:href is base URL for access directory */
      "d:href": string;
      /** d:propstat is struct acess names, dates and status */
      "d:propstat": {
        /** d:prop is key for name and dates */
        "d:prop": {
          /** d:displayname is directory name */
          "d:displayname": string;
          /**  d:resourcetype is additional value */
          "d:resourcetype": {
            /**  d:collection is additional value */
            "d:collection": any;
          };
          /** d:displayname is a string containing the date of last modification */
          "d:getlastmodified": string;
        };
        /** d:status is status response in string */
        "d:status": string;
      };
    }[];
  };
}
