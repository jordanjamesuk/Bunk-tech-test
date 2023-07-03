import {
    iExpense,
    iIndividualExpenses,
    iOwesOwed,
} from '../interfaces/interfaces';
import {
    calculateExpenses,
    calculatePayouts,
    calculateShares,
} from './handlers';

describe('API Handler Functions', () => {
    const _expenses: iExpense[] = [
        { traveller_name: 'TEST_1', expense: 5 },
        { traveller_name: 'TEST_2', expense: 5 },
        { traveller_name: 'TEST_3', expense: 5 },
        { traveller_name: 'TEST_4', expense: 5 },
        { traveller_name: 'TEST_5', expense: 5 },
        { traveller_name: 'TEST_5', expense: 5 },
    ];

    const _individualExpenses: iIndividualExpenses = {
        TEST_1: 5,
        TEST_2: 5,
        TEST_3: 5,
        TEST_4: 5,
        TEST_5: 10,
    };

    const _owes: iOwesOwed = {
        TEST_1: 5,
        TEST_2: 5,
        TEST_3: 5,
        TEST_4: 5,
    };

    const _owed: iOwesOwed = {
        TEST_5: 4,
    };

    it('Calculate Expenses', async () => {
        let { total, individualExpenses } = calculateExpenses(_expenses);

        expect(total).toEqual(30);
        expect(individualExpenses).toMatchObject({
            TEST_1: 5,
            TEST_2: 5,
            TEST_3: 5,
            TEST_4: 5,
            TEST_5: 10,
        });
    });

    it('Calculate Shares', async () => {
        const total = 30;

        let { equalShare, owes, owed } = calculateShares(
            total,
            _individualExpenses
        );

        expect(equalShare).toEqual(6);

        expect(owes).toMatchObject({
            TEST_1: 1,
            TEST_2: 1,
            TEST_3: 1,
            TEST_4: 1,
        });

        expect(owed).toMatchObject({
            TEST_5: 4,
        });
    });

    it('Calculate Payouts', async () => {
        const payouts = calculatePayouts(_owes, _owed);
        for (const payout of payouts) {
            expect(payout).toMatchObject({
                traveller_name: 'TEST_4',
                traveller_owed: 'TEST_5',
                amount: 4,
            });
        }
    });
});
