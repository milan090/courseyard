let winston = require("winston");

// define the custom settings for each transport (file, console)
const TIME_ZONE = process.env.TIME_ZONE || Intl.DateTimeFormat().resolvedOptions().timeZone;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: TIME_ZONE,
  });
};

const consoleLoggerFormat = winston.format.combine(
  winston.format.timestamp({ format: timezoned }),
  winston.format.colorize(),
  winston.format.align(),
  winston.format.printf((info) => {
    return `${info.level} [${info.timestamp}] ${info.message}`;
  })
);

const fileLoggerFormat = winston.format.combine(
  winston.format.timestamp({ format: timezoned }),
  winston.format.printf((info) => {
    return JSON.stringify(info);
  })
);

// options for logger object
const options = {
  file: {
    level: "info",
    filename: `${__dirname}/../logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
    colorize: false,
    format: fileLoggerFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: consoleLoggerFormat,
  },
};

const transports = [new winston.transports.Console(options.console)];

if (process.env.NODE_ENV === "production") {
  transports.push(new winston.transports.File(options.file));
}

// logger object with above defined options
const logger = winston.createLogger({
  transports,
  exitOnError: false,
});

// writing file
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
