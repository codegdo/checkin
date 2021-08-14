import queryString from 'query-string';

export type HttpResponse<T> = Response & {
  data?: T;
};

export type RequestOption = {
  url?: string;
  method?: string;
  baseUrl?: string;
  headers?: any;
  params?: any;
  body?: any;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
};

class HttpService {
  private credentials: RequestCredentials;
  private contentType: string;
  private withCredentials: boolean;

  constructor() {
    this.contentType = 'application/json';
    this.credentials = 'include';
    this.withCredentials = true;
  }

  async request<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { headers, params, ...args } = option || {};

    url = params ? queryString.stringifyUrl({ url, query: params }) : url;

    option = {
      method: params ? 'GET' : 'POST',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async get<T>(url: string, option?: RequestOption): Promise<HttpResponse<T>> {
    const { headers, params, ...args } = option || {};

    url = params ? queryString.stringifyUrl({ url, query: params }) : url;

    option = {
      method: 'GET',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async post<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { body, headers, ...args } = option || {};

    option = {
      method: 'POST',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      body: JSON.stringify(body),
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async patch<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { body, headers, ...args } = option || {};

    option = {
      method: 'PATCH',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      body: JSON.stringify(body),
      ...args,
    };

    return this._fetch(new Request(url, option));
  }

  async delete<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { body, headers, ...args } = option || {};

    option = {
      method: 'DELETE',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      body: JSON.stringify(body),
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
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
}

export const http = new HttpService();
