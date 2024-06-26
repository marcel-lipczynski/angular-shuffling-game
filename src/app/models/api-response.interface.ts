export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}
