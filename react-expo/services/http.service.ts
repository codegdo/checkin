import queryString from 'query-string';
import { configs } from '../app.config';

export type HttpResponse<T> = Response & {
  data?: T;
};

export type RequestOption = {
  baseUrl?: string;
  url?: string;
  method?: string;
  headers?: any;
  params?: any;
  body?: any;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
};

type RequestUrl = {
  baseUrl?: string;
  pathUrl: string;
  params?: any
}

class HttpService {
  private credentials: RequestCredentials;
  private contentType: string;
  private withCredentials: boolean;
  private baseUrl: string;

  constructor() {
    this.contentType = 'application/json';
    this.credentials = 'include';
    this.withCredentials = true;
    this.baseUrl = configs?.baseUrl;
  }

  private getUrl({ baseUrl, pathUrl, params }: RequestUrl): string {
    let url = pathUrl || '/';

    if (baseUrl) {
      url = `${baseUrl}${pathUrl}`;
    } else if (this.baseUrl) {
      url = `${this.baseUrl}${pathUrl}`;
    }

    return params ? queryString.stringifyUrl({ url, query: params }) : url;
  }

  async request<T>(pathUrl: string, option?: RequestOption): Promise<HttpResponse<T>> {
    const { headers, method, body, params, baseUrl, ...args } = option || {};
    const url = this.getUrl({ baseUrl, pathUrl, params });

    option = {
      headers: { 'Content-Type': this.contentType, 'Accept': this.contentType, ...headers },
      method: method || (body ? 'POST' : 'GET'),
      body: JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async get<T>(pathUrl: string, option?: RequestOption): Promise<HttpResponse<T>> {
    const { headers, params, baseUrl, ...args } = option || {};
    const url = this.getUrl({ baseUrl, pathUrl, params });

    option = {
      headers: { 'Content-Type': this.contentType, ...headers },
      method: 'GET',
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async post<T>(pathUrl: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { headers, body, baseUrl, ...args } = option || {};
    const url = this.getUrl({ baseUrl, pathUrl });

    option = {
      headers: { 'Content-Type': this.contentType, ...headers },
      method: 'POST',
      body: JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async patch<T>(pathUrl: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { headers, body, baseUrl, ...args } = option || {};
    const url = this.getUrl({ baseUrl, pathUrl });

    option = {
      headers: { 'Content-Type': this.contentType, ...headers },
      method: 'PATCH',
      body: JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async delete<T>(pathUrl: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { headers, body, baseUrl, ...args } = option || {};
    const url = this.getUrl({ baseUrl, pathUrl });

    option = {
      headers: { 'Content-Type': this.contentType, ...headers },
      method: 'DELETE',
      body: JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, option));
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

export const http = new HttpService();
