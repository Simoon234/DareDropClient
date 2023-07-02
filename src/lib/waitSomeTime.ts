export default function waitSomeTime(time: number, promise: any) {
  const promiseTimeout = new Promise((resolve) => {
    setTimeout(resolve, time);
  });
  const promiseCombined = Promise.all([promise, promiseTimeout]);
  return promiseCombined.then((values) => values[0]);
};