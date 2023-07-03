import {
    iExpenseDetails,
    iIndividualExpenses,
    iOwesOwed,
    iPayout,
    iShareDetails,
    iExpense,
} from '../interfaces/interfaces';

/**
 * calculateExpenses - calculate the total, and combine expenses from travellers.
 *
 * @param {iExpense[]} expenses
 * @returns {iExpenseDetails} - returns total, and unique travellers with how much they've spent
 */
export const calculateExpenses = (expenses: iExpense[]): iExpenseDetails => {
    let total = 0;
    const individualExpenses: iIndividualExpenses = {};
    for (const expense of expenses) {
        total += expense.expense;
        if (expense.traveller_name in individualExpenses) {
            individualExpenses[expense.traveller_name] += expense.expense;
        } else {
            individualExpenses[expense.traveller_name] = expense.expense;
        }
    }
    total = Number(total.toFixed(2));
    return { total, individualExpenses };
};

/**
 * calculateShares - calculate the shares amounst individual travellers.
 *
 * @param {number} total
 * @param {iIndividualExpenses} individualExpenses
 * @returns {iShareDetails} - returns equal share, who owes money, and who is owed money
 */
export const calculateShares = (
    total: number,
    individualExpenses: iIndividualExpenses
): iShareDetails => {
    const equalShare = Number(
        (total / Object.keys(individualExpenses).length).toFixed(2)
    );
    const owes: iOwesOwed = {};
    const owed: iOwesOwed = {};

    for (const [person, amount] of Object.entries(individualExpenses)) {
        const diff = Number((equalShare - amount).toFixed(2));
        if (diff > 0) {
            owes[person] = diff;
        } else {
            owed[person] = -diff;
        }
    }

    return { equalShare, owes, owed };
};

/**
 * calculatePayouts - calculate the payouts of individual travellers.
 *
 * @param {iOwesOwed} owes - list of who owes money.
 * @param {iOwesOwed} owed - list of who owes money.
 * @returns {iPayout[]} - return list of payout objects.
 */
export const calculatePayouts = (
    owes: iOwesOwed,
    owed: iOwesOwed
): iPayout[] => {
    const payouts = [];

    while (Object.keys(owes).length > 0 && Object.keys(owed).length > 0) {
        const ower = Object.keys(owes).reduce((a, b) =>
            owes[a] > owes[b] ? a : b
        );
        const owee = Object.keys(owed).reduce((a, b) =>
            owed[a] > owed[b] ? a : b
        );
        const amount = Number(Math.min(owes[ower], owed[owee]).toFixed(2));

        if (amount > 0) {
            payouts.push({
                traveller_name: ower,
                traveller_owed: owee,
                amount,
            });
            owes[ower] = Number((owes[ower] - amount).toFixed(2));
            owed[owee] = Number((owed[owee] - amount).toFixed(2));

            if (owes[ower] <= 0) {
                delete owes[ower];
            }

            if (owed[owee] <= 0) {
                delete owed[owee];
            }
        } else {
            break;
        }
    }

    return payouts;
};
