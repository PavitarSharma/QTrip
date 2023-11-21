// typings.d.ts

declare namespace NodeJS {
  interface Timeout {
    ref(): void;
    unref(): void;
  }
}

declare type Timeout = ReturnType<typeof setTimeout>;
