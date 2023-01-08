export default class Router {
  url: URL;
  params: URLSearchParams;

  constructor() {
    this.url = new URL(window.location.href);
    this.params = new URLSearchParams(this.url.search);
  }

  setQuery(name: string, value: string): void {
    this.params.set(name, value);
    window.history.replaceState(null, '', `?${this.params.toString()}`);
  }

  deleteQuery(name: string) {
    this.params.delete(name);
    const url = this.params.toString()
      ? `?${this.params.toString()}`
      : this.url;
    window.history.replaceState(null, '', url);
  }

  getQuery(name: string): string | null {
    const value = this.params.get(name);
    console.log(value);
    return value;
  }

  getQueryString(): string | null {
    const value = this.params.toString();
    return value;
  }
}
