import winston from "winston";

const {  createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

export const logger = createLogger({
level: 'info',
defaultMeta: { service: 'user-service' },
format: combine(
    label({ label: 'My logger' }),
    timestamp(),
    customFormat
),
    transports: [new transports.Console()]
});

