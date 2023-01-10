export default class Router {
  url: URL;
  params: URLSearchParams;

  constructor() {
    this.url = new URL(window.location.href);
    this.params = new URLSearchParams(this.url.search);
  }

  setQuery(name: string, value: string): void {
    this.params.set(name, value);
    console.log(this.params.toString());
    window.history.replaceState(null, '', `?${this.params.toString()}`);
  }

  deleteQuery(name: string) {
    console.log('deleted');
    this.params.delete(name);
    const url = this.params.toString()
      ? `${this.url.origin}?${this.params.toString()}`
      : `${this.url.origin}`;
    window.history.replaceState(null, '', url);
  }

  getQuery(name: string): string | null {
    this.params = new URLSearchParams(window.location.search);
    const value = this.params.get(name);
    return value;
  }

  getQueryString(): string | null {
    const value = this.params.toString();
    return value;
  }

  resetURL() {
    const url = `${this.url.origin}`;
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
