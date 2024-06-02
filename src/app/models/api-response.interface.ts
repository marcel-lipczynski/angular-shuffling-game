export interface ListResponse<T> {
  message: string;
  total_record: number;
  total_pages: number;
  previous: string;
  next: string;
  results: Array<T>;
}

export interface DetailedResponse<T> {
  message: string;
  result: { properties: T };
  description: string;
  _id: string;
  uid: string;
  __v: number;
}
