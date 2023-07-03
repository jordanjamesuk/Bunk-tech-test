import { NextFunction, Request, Response } from 'express';
import { iExpense, isExpense } from '../interfaces/interfaces';

/**
 * payoutMiddleware - Validate request body.
 *
 */
export const payoutMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.expenses)
        return res
            .status(400)
            .json({ status: 'failed', message: 'malformed data' });

    const expenses: iExpense[] = req.body.expenses;
    for (let expense of expenses) {
        if (!isExpense(expense))
            return res
                .status(400)
                .json({ status: 'failed', message: 'malformed data' });
    }

    next();
};
