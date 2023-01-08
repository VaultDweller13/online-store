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
      : this.url.origin;
    window.history.replaceState(null, '', url);
  }

  getQuery(name: string): string | null {
    const value = this.params.get(name);
    return value;
  }

  getQueryString(): string | null {
    const value = this.params.toString();
    console.log(value);
    return value;
  }

  resetURL() {
    window.history.replaceState(null, '', this.url.origin);
    this.params = new URLSearchParams(this.url.search);
  }

  copyURL() {
    console.log(window.location.href);
    navigator.clipboard.writeText(window.location.href).then(
      () => console.log('Copied!'),
      () => console.log('Failed to copy')
    );
  }
}