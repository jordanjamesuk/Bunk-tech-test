import express from 'express';
import { Router, Request, Response } from 'express';
import { iExpense } from '../interfaces/interfaces';
import {
    calculateExpenses,
    calculatePayouts,
    calculateShares,
} from '../handlers/handlers';
import { payoutMiddleware } from '../middleware/payout.middleware';

const router = Router();
router.use(express.json());

router.post('/', payoutMiddleware, (req: Request, res: Response) => {
    const expenses: iExpense[] = req.body.expenses;

    try {
        const { total, individualExpenses } = calculateExpenses(expenses);
        const { equalShare, owes, owed } = calculateShares(
            total,
            individualExpenses
        );
        const payouts = calculatePayouts(owes, owed);
        return res.status(200).json({ total, equalShare, payouts });
    } catch (err) {
        return res.status(500).send({
            staus: 'failed',
            message:
                'An internal sever error has occured, unable to complete request.',
        });
    }
});

export default router;
