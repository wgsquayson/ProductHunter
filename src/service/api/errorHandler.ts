import {AxiosError} from 'axios';

export default function errorHandler(
  err: unknown,
  defaultMessage?: string,
): string {
  const error = err as AxiosError<{message: string}>;
  const errorData = error?.response?.data;

  if (errorData?.message) {
    return errorData.message;
  }

  return (
    defaultMessage ??
    'An error happened while trying to fetch the resource. Try again later.'
  );
}
