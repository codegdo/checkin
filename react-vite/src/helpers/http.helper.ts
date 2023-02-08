export type HttpResponse<T> = Response & {
  data?: T;
};

export type RequestOptions = {
  baseUrl?: string;
  url?: string;
  method?: string;
  headers?: any;
  body?: any;
  params?: any;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
};

class HttpHelper {
  private credentials: RequestCredentials;
  private contentType: string;
  private withCredentials: boolean;

  constructor() {
    this.contentType = 'application/json';
    this.credentials = 'include';
    this.withCredentials = true;
  }

  private requestOptions(options: RequestOptions) {
    const { headers, method, body, ...args } = options || {};

    return {
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
    }
  }

  async request<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async get<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = 'GET';
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async post<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = 'POST';
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async patch<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = 'PATCH';
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async put<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = 'PUT';
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async delete<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = 'DELETE';
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
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
