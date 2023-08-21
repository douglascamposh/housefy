const DEBUG_MODE = process.env.DEBUG_MODE

const info = (key, value = '') => {
  if (DEBUG_MODE) {
    console.info(key, value);
  }
};

const log = (key, value = '') => {
  if (DEBUG_MODE) {
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
