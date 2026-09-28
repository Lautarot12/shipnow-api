import winston from "winston";
import config from "./env.config.js";

const levels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

const format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}] ${message}`
    })
)

const transports = [
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: config.logLevel
    }),

    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
    })
]

if (config.nodeEnv === 'development') {
    transports.push(
        new winston.transports.Console({
            level: config.logLevel
        })
    )
}

const logger = winston.createLogger({
    levels: levels.levels,
    format,
    transports
})

export default logger