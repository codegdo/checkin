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

  constructor() {
    this.credentials = 'include';
    this.contentType = 'application/json';
  }

  request<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { body, headers, ...args } = option || {};
    option = {
      method: body ? 'POST' : 'GET',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      ...args,
    };
    return this._fetch(new Request(url, option));
  }

  async get<T>(url: string, option?: RequestOption): Promise<HttpResponse<T>> {
    const { headers, ...args } = option || {};
    option = {
      method: 'GET',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      ...args,
    };
    console.log('OPTION', option);
    return this._fetch(new Request(url, option));
  }

  post<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { body, headers, ...args } = option || {};
    option = {
      method: 'POST',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      ...args,
    };
    return this._fetch(new Request(url, option));
  }

  patch<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { body, headers, ...args } = option || {};
    option = {
      method: 'PATCH',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
      ...args,
    };
    return this._fetch(new Request(url, option));
  }

  delete<T>(url: string, option: RequestOption): Promise<HttpResponse<T>> {
    const { body, headers, ...args } = option || {};
    option = {
      method: 'DELETE',
      headers: { 'Content-Type': this.contentType, ...headers },
      credentials: this.credentials,
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
