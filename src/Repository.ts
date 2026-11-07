/**
 * Repository is a simple data type for handling available directories or files.
 */
export interface Repository {
  /** Directory or file name */
  name: string;
  /** Date of last modification/insertion of the directory or file */
  date: Date;
  /** Full URL for accessing the directory or file */
  url: string;
  /** resquest status */
  status: string;
  /** Type classification directory or file */
  isFile: boolean;
  /** Type classification directory or file */
  bytes: number | undefined;

  formatBytes(): string;
}
