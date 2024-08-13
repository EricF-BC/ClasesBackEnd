import winston from "winston";

const customLevels = {
  levels: {
    debug: 5,
    http: 4,
    info: 3,
    warning: 2,
    error: 1,
    fatal: 0,
  },

  colors: {
    debug: "blue",
    http: "cyan",
    info: "green",
    warning: "yellow",
    error: "red",
    fatal: "redBG white",
  },
};

winston.addColors(customLevels.colors);

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console({ level: "debug" })],
});

const errorAndFatalFilter = winston.format((info) => {
    return info.level === 'error' || info.level === 'fatal' ? info : false;
  });

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "error",
      format: winston.format.combine(
        errorAndFatalFilter()
      )
    }),
  ],
});


export const logger = process.env.NODE_ENV === "PROD" ? prodLogger : devLogger;