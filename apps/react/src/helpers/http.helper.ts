export interface RequestOptions {
  baseUrl?: string;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string | Record<string, unknown>;
  params?: Record<string, unknown>;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
}

export interface HttpHelperConfig {
  contentType: string;
  credentials: RequestCredentials;
  withCredentials: boolean;
}

export interface HttpResponse<T> extends Response {
  data?: T;
}

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

class HttpHelper {
  private contentType: string;
  private credentials: RequestCredentials;
  private withCredentials: boolean;

  constructor(config?: HttpHelperConfig) {
    this.contentType = config?.contentType || 'application/json';
    this.credentials = config?.credentials || 'include';
    this.withCredentials = config?.withCredentials || true;
  }

  private requestOptions(options: RequestOptions): RequestInit {
    const { headers, method, body, ...args } = options || {};

    return {
      headers: {
        'Content-Type': this.contentType,
        'Accept': this.contentType,
        ...headers
      },
      method: method || (body ? HTTP_METHODS.POST : HTTP_METHODS.GET),
      body: typeof body === 'string' ? body : JSON.stringify(body),
      credentials: this.credentials,
      withCredentials: this.withCredentials,
      ...args,
    };
  }

  async request<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async get<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = HTTP_METHODS.GET;
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async post<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = HTTP_METHODS.POST;
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async patch<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = HTTP_METHODS.PATCH;
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async put<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = HTTP_METHODS.PUT;
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async delete<T>(url: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    options.method = HTTP_METHODS.DELETE;
    return this._fetch<T>(new Request(url, this.requestOptions(options)));
  }

  async _fetch<T>(req: Request, responseType?: 'json' | 'text' | 'blob'): Promise<HttpResponse<T>> {
    const res: HttpResponse<T> = await fetch(req);
    const body = responseType === 'text' ? await res.text() : responseType === 'blob' ? await res.blob() : await res.json();
    res.data = body;
    return res;
  }
}

export const http = new HttpHelper();
