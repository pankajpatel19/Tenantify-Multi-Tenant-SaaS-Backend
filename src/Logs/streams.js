import logger from "./logger.js";

export const stream = {
  write: (message) => logger.info(message.trim()),
};
