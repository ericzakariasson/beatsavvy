export const isProduction = () => process.env.NODE_ENV === "production";

const ONE_HOUR = 60 * 60;

export const time = {
  seconds: (n: number) => (n * ONE_HOUR) / 60 / 60,
  minutes: (n: number) => (n * ONE_HOUR) / 60,
  hours: (n: number) => n * ONE_HOUR,
  days: (n: number) => n * ONE_HOUR * 24,
  weeks: (n: number) => n * ONE_HOUR * 24 * 7
};
