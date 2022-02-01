type WaitUntilOptions = {
  interval: number;
  timeout: number;
};

const defaultOptions: WaitUntilOptions = {
  interval: 50,
  timeout: 6000,
};

type ConditionCallback = () => boolean;

const waitUntil = (
  conditionCallback: ConditionCallback,
  options: Partial<WaitUntilOptions> = {},
) => {
  const { interval, timeout } = { ...defaultOptions, ...options };
  const promise = new Promise((resolve, reject) => {
    let timeoutId: null | ReturnType<typeof setTimeout> = null;

    setTimeout(() => {
      const e = new Error('waitUntil time out');
      e.name = 'WaitUntilTimeoutError';
      reject(e);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }, timeout);

    const check = () => {
      if (conditionCallback()) {
        return resolve(null);
      }
      timeoutId = setTimeout(check, interval);
    };

    check();
  });

  return promise;
};

export default waitUntil;
