export interface BaseError extends Error {
  name: string;
  code: number;
}
