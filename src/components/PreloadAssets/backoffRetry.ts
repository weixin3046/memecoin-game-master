import { sleep } from './sleep';

/**
 * Exponential backup upon any error
 */
export const backoffRetry = async <T, U = undefined>(options: {
  /** The function the will be recalled upon error */
  func: (trial: number) => T;
  /** Whether logging trace into console, default `true` */
  reportTrace?: boolean;
  /** The maximum number of trials, `0` for unlimited */
  maxTrials?: number;
  /** The initial time (in ms) to wait between each trial, default `1000` */
  interval?: number;
  /** The maximum time (in ms) to wait between each trial, default `4000` */
  maxInterval?: number;
  /** The callback function that is called upon error, defaults to `console.error` */
  onError?: (err: unknown) => unknown;
  /** The callback function that is called after `maxTrials` */
  fallback?: (err: unknown) => Promise<U>;
}): Promise<T | U> => {
  const {
    func,
    reportTrace = true,
    maxTrials = 0,
    interval = 1000,
    maxInterval = 4 * 1000,
    onError = console.error,
    fallback,
  } = options;
  let backoff_interval = interval;
  let trial = 0;

  while (true) {
    try {
      return await func(trial);
    } catch (err: unknown) {
      if (reportTrace) console.trace();
      onError(err);

      if (maxTrials === -1 || maxTrials > 0) {
        trial += 1;
        if (maxTrials !== -1 && trial >= maxTrials)
          return fallback !== undefined
            ? await fallback(err)
            : (undefined as U);
      }
      await sleep(backoff_interval);
      backoff_interval = Math.min(backoff_interval * 2, maxInterval);
    }
  }
};
