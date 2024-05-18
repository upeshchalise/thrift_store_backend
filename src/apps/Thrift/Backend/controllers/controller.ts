import { NextFunction, Request, Response } from 'express';

export interface Controller {
  invoke(req: Request, res: Response, next: NextFunction): Promise<void>;
}