/* eslint-disable @typescript-eslint/no-explicit-any */
export type PromiseExecutor<T> = (
  resolve: (value: T) => void,
  reject: (reason: any) => void
) => void;
