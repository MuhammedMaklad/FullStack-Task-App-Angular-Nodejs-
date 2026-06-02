import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.socket.remoteAddress;

    const color =
      status >= 500 ? '\x1b[31m' :
      status >= 400 ? '\x1b[33m' :
      status >= 300 ? '\x1b[36m' :
                      '\x1b[32m';
    const reset = '\x1b[0m';

    console.log(
      `${timestamp} ${color}${method} ${url} ${status}${reset} - ${duration}ms - ${ip}`,
    );
  });

  next();
};
