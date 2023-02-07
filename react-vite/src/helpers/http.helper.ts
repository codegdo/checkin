import queryString from 'query-string';
import { BASE_URL } from '../app.config';

export type HttpResponse<T> = Response & {
  data?: T;
};

export type RequestOption = {
  baseUrl?: string;
  url?: string;
  method?: string;
  headers?: any;
  params?: any;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
};

export type RequestOptionBody<T> = RequestOption & {
  body?: T | string;
};

type RequestUrl = {
  url: string;
  params?: any
}

class HttpHelper {
  private credentials: RequestCredentials;
  private contentType: string;
  private withCredentials: boolean;

  constructor() {
    this.contentType = 'application/json';
    this.credentials = 'include';
    this.withCredentials = true;
  }

  private getUrl({ url, params }: RequestUrl): string {
    return params ? queryString.stringifyUrl({ url, query: params }) : url;
  }

  async request<T>(url: string, option?: RequestOptionBody<T>): Promise<HttpResponse<T>> {
    const { headers, method, body, params, ...args } = option || {};

    const _option = {
      headers: {
        'Content-Type': this.contentType,
        'Accept': this.contentType,
        ...headers
      },
      method: method || (body ? 'POST' : 'GET'),
      body: (typeof body === 'string') ? body : JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(this.getUrl({ url, params }), _option));
  }

  async get<T>(url: string, option?: RequestOption): Promise<HttpResponse<T>> {
    const { headers, params, ...args } = option || {};
    const _option = {
      headers: {
        'Content-Type': this.contentType,
        'Accept': this.contentType,
        ...headers
      },
      method: 'GET',
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(this.getUrl({ url, params }), _option));
  }

  async post<T>(url: string, option: RequestOptionBody<T>): Promise<HttpResponse<T>> {
    const { headers, body, ...args } = option || {};
    const _option = {
      headers: {
        'Content-Type': this.contentType,
        'Accept': this.contentType,
        ...headers
      },
      method: 'POST',
      body: (typeof body === 'string') ? body : JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, _option));
  }

  async patch<T>(url: string, option: RequestOptionBody<T>): Promise<HttpResponse<T>> {
    const { headers, body, ...args } = option || {};
    const _option = {
      headers: {
        'Content-Type': this.contentType,
        'Accept': this.contentType,
        ...headers
      },
      method: 'PATCH',
      body: (typeof body === 'string') ? body : JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, _option));
  }

  async put<T>(url: string, option: RequestOptionBody<T>): Promise<HttpResponse<T>> {
    const { headers, body, ...args } = option || {};
    const _option = {
      headers: {
        'Content-Type': this.contentType,
        'Accept': this.contentType,
        ...headers
      },
      method: 'PUT',
      body: (typeof body === 'string') ? body : JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, _option));
  }

  async delete<T>(url: string, option: RequestOptionBody<T>): Promise<HttpResponse<T>> {
    const { headers, body, ...args } = option || {};
    const _option = {
      headers: {
        'Content-Type': this.contentType,
        'Accept': this.contentType,
        ...headers
      },
      method: 'DELETE',
      body: (typeof body === 'string') ? body : JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, _option));
  }

  private _fetch<T>(req: Request): Promise<HttpResponse<T>> {
    return new Promise((resolve, reject) => {
      fetch(req)
        .then((res: HttpResponse<T>) =>
          res.json().then((body) => {
            res.data = body;
            return res;
          })
        )
        .then((res) => {
          res.ok ? resolve(res) : reject(res);
        })
        .catch((err) => reject(err));
    });
  }
}

export const http = new HttpHelper();
