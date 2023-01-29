import { createLogger, format, transports } from "winston";
import { Request, Response, NextFunction } from "express";

export const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [
		new transports.File({ filename: "core/logs/error.log", level: "error" }),
		new transports.File({ filename: "core/logs/combined.log" }),
	],
});

export const requestLogger = (req: Request, _: Response, next: NextFunction): void => {
	const logData = {
		method: req.method,
		url: req.url,
	};
	logger.info(logData);
	next();
};
