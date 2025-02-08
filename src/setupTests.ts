import "@testing-library/jest-dom";

beforeAll(() => {
  class MockIntersectionObserver implements IntersectionObserver {
    callback: IntersectionObserverCallback;
    root: Element | null = null;
    rootMargin: string = '0px';
    thresholds: ReadonlyArray<number> = [0];

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe() {
      this.callback([{ isIntersecting: true }] as IntersectionObserverEntry[], this);
    }

    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    
  }

  globalThis.IntersectionObserver = MockIntersectionObserver;
  process.env.VITE_GITHUB_TOKEN = "mocked_github_token";

});

