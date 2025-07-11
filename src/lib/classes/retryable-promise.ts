import { PromiseExecutor } from "../types/promise-executor";

export class RetryablePromise<T> extends Promise<T> {
  static retry = async <T>(
    retries: number,
    executor: PromiseExecutor<T>
  ): Promise<T> => {
    return new RetryablePromise(executor).catch((error) => {
      console.error(`Retrying due to error (${retries}): ${error}`);
      return retries > 0
        ? RetryablePromise.retry(retries - 1, executor)
        : RetryablePromise.reject(error);
    });
  };
}
