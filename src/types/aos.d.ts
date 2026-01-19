export {};

declare global {
  interface Window {
    AOS?: {
      init: (params: any) => void;
      refresh: () => void;
    };
  }
}
