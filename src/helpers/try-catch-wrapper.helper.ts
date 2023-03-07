import { Request, Response, NextFunction } from 'express';

export const tryCatchWrapper = (fn: Function) => (
req: Request, res: Response, next: NextFunction
) => {
    try {
        fn(req, res, next)
    } catch (error) {
        next(error)
    }
}