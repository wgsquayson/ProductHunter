export type FetchResponse<T> = {
  data?: T;
  error?: string;
  loading: boolean;
  total?: number;
};
