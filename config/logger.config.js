import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

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
    winston.format.printf(({ timestamp, level, message })=>{
        return `${timestamp} [${level}] ${message}`
    })
)

const consoleTransport = new winston.transports.Console({
    level: 'debug'
})

const errorRotateTransport = new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxFiles: '7d'
})

const logger = winston.createLogger({
    levels: levels.levels,
    format,
    transports: [
        consoleTransport,
        errorRotateTransport
    ]
})

export default logger