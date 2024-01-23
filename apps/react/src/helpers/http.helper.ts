export interface RequestOptions {
  baseUrl?: string;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: string | Record<string, unknown>;
  params?: Record<string, unknown>;
  withCredentials?: boolean;
  credentials?: RequestCredentials;
  signal?: AbortSignal
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

  async _fetch<T>(req: Request): Promise<HttpResponse<T>> {
    try {
      const res: HttpResponse<T> = await fetch(req);

      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }

      if (res.status === 204) {
        // No content
        res.data = undefined;
      } else {
        const rawBody = await res.text();
        try {
          res.data = JSON.parse(rawBody);
        } catch (jsonError) {
          res.data = rawBody as T;
        }
      }

      return res;
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  }

}

export const http = new HttpHelper();
