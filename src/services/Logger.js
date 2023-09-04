const NEXT_PUBLIC_DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE

const info = (key, value = '') => {
  if (NEXT_PUBLIC_DEBUG_MODE) {
    console.info(key, value);
  }
};

const log = (key, value = '') => {
  if (NEXT_PUBLIC_DEBUG_MODE) {
    console.log(key, value);
  }
};

const warn = (key, value = '') => {
  console.warn(key, value);
};

const error = (key, value = '') => {
  console.error(key, value);
};

export const Logger = {
  info,
  log,
  warn,
  error,
};
