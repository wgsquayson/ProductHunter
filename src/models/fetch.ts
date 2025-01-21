export type FetchResponse<T> = {
  data?: T;
  error?: string;
  total?: number;
};
