declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
import { NextFunction, Request, Response } from 'express';
export declare const isLoggedIn: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
