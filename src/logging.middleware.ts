import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(new Date().toLocaleString('en-GB'), ' Incoming Request', req.method, req.originalUrl, 'from IP', req.ip);
    next();
  }
}