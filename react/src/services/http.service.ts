export type HttpResponse<T> = Response & {
  data?: T;
};

class HttpService {

  request<T>(url: string): Promise<HttpResponse<T>> {
    return this._fetch(new Request(url))
  }

  get<T>(url: string): Promise<HttpResponse<T>> {
    return this._fetch(new Request(url))
  }

  post<T>(url: string): Promise<HttpResponse<T>> {
    return this._fetch(new Request(url))
  }

  patch<T>(url: string): Promise<HttpResponse<T>> {
    return this._fetch(new Request(url))
  }

  delete<T>(url: string): Promise<HttpResponse<T>> {
    return this._fetch(new Request(url))
  }

  private _fetch<T>(req: Request): Promise<HttpResponse<T>> {
    return new Promise((resolve, reject) => {
      fetch(req)
        .then(res => res.json().then(body => body))
        .then(res => { res.ok ? resolve(res) : reject(res) })
        .catch(err => reject(err));
    });
  }
}

export const http = new HttpService();