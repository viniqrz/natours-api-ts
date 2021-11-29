export interface BaseError extends Error {
  name: string;
  statusCode: number;
  path?: string;
  value?: string;
}
