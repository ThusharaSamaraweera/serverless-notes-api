import winston from "winston";

const formatter = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  winston.format.align(),
  winston.format.printf((info) => {
    const { timestamp, level, message, event } = info;
    let context = {};
    if (event) {
      context = {
        path: event.requestContext.path,
        method: event.requestContext.httpMethod,
        sourceIp: event.requestContext.identity.sourceIp,
        userAgent: event.requestContext.identity.userAgent,
      };
    }
    return `${timestamp} [${level}] : ${message} ${
      Object.keys(context).length ? JSON.stringify(context, null, 2) : ""
    }`;
  })
);

class Logger {
  logger;

  constructor() {
    const transport = new winston.transports.Console({
      format: formatter,
    });
    this.logger = winston.createLogger({
      transports: [transport],
    });
  }

  info(message, event) {
    this.logger.info(message, event);
  }

  warn(message, event) {
    this.logger.warn(message, event);
  }

  error(message, event) {
    this.logger.error(message, event);
  }
}

export const logger = new Logger();
