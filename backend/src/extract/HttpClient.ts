import { errorLogger } from '@logger';
import { Node } from '@model/Node';
import { Record } from 'neo4j-driver';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient {
  private readonly instance: AxiosInstance;
  private readonly url: string;

  public constructor(url: string, headers?: any) {
    this.url = url;
    this.instance = axios.create({ headers });
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected async get<T>(params: { params: Object }) {
    return this.instance.get<T>(this.url, params);
  };

  protected abstract processAll(): void;

  protected abstract processNodes(records: Record[] | undefined): void;

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}