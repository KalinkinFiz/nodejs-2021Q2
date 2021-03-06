import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import util from 'util';
import config from '../common/config';

const { PORT } = config;

const pipeline = util.promisify(stream.pipeline);

export const logging = async (req: Request, res: Response, next: NextFunction) => {
  const { method, body, params, query } = req;
  const requestTime = new Date();
  const processTime = Date.now() - +requestTime;
  const logsFolder = path.join(__dirname, '../../logs');

  if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder);
  }

  try {
    await pipeline(
      stream.Readable.from(`
    request Time:     ${requestTime}
    method:           ${method}
    url:              ${`http://localhost:${PORT}${req.baseUrl + req.url}`}
    body:             ${JSON.stringify(body)}
    params:           ${JSON.stringify(params)}
    query:            ${JSON.stringify(query)}
    processing time:  ${processTime} ms
    status code:      ${res.statusCode}\n`),
      fs.createWriteStream(path.join(__dirname, '../../logs/logging.log'), { flags: 'a' }),
    );
  } catch (error) {
    process.stderr.write(error.message);
    process.exit(1);
  }
  next();
};
