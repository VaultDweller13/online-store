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
    // this.url = new URL(window.location.href);
  }

  deleteQuery(name: string) {
    this.params.delete(name);
    const url = this.params.toString()
      ? `${this.url.pathname}/?${this.params.toString()}`
      : `${this.url.pathname}`;
    window.history.replaceState(null, '', url);
  }

  getQuery(name: string): string | null {
    const value = this.params.get(name);
    return value;
  }

  getQueryString(): string | null {
    const value = this.params.toString();
    return value;
  }

  resetURL() {
    const url = `${this.url.origin}${this.url.pathname}`;
    window.history.replaceState(null, '', url);
    this.url.search = '';
    this.params = new URLSearchParams(this.url.search);
  }

  copyURL() {
    navigator.clipboard.writeText(window.location.href).then(
      () => console.log('Copied!'),
      () => console.log('Failed to copy')
    );
  }
}
