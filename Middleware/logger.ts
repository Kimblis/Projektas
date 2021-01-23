import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import fs from 'fs';

const loggerFile = new console.Console(fs.createWriteStream('./log.txt'));

const logger = (req: Request, res: Response, next: NextFunction) => {
  loggerFile.log(
    `${req.method}: ${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format(
      'MMMM Do YYYY, h:mm:ss a'
    )} STATUS: ${res.statusCode}`
  );
  next();
};

export default logger;
