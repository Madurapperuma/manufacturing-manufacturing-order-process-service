import { AxiosRequestConfig } from 'axios';
export interface HttpClient {
  get(
    url: string,
    cachettl?: number,
    config?: AxiosRequestConfig,
  ): Promise<any>;
}
