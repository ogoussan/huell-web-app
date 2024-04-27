import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {ResponseError} from "../interfaces";

export type RequestError = AxiosError<ResponseError>;

export function getErrorMessage(err: unknown): string | string[] {
  if (axios.isAxiosError(err)) {
    if (err.response?.data.message?.length) {
      return err.response.data.message;
    }

    return err.response?.data.error || err.message;
  }

  return 'Something went wrong!';
}

console.log('api url: ', import.meta.env.VITE_API_URL);

const client = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });

const request = async <T>(
  url: string,
  options?: AxiosRequestConfig,
): Promise<T> => {

  const headers = options?.headers || {};

  headers['Content-Type'] = 'application/json';

  return client<T>({
    url,
    method: 'GET',
    withCredentials: true,
    headers,
    ...options,
  }).then((response: AxiosResponse<T>) => response.data);
};

export const requestWithResponse = async <T>(
  url: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {

  const headers = options?.headers || {};

  headers['Content-Type'] = 'application/json';

  return client<T>({
    url,
    method: 'GET',
    withCredentials: true,
    headers,
    ...options,
  });
};

export default request;
