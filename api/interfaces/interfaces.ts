export interface iExpense {
    id?: string;
    traveller_name: string;
    expense: number;
}

export function isExpense(obj: any): obj is iExpense {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        typeof obj.traveller_name === 'string' &&
        typeof obj.expense === 'number'
    );
}

export interface iIndividualExpenses {
    [key: string]: number;
}

export interface iOwesOwed {
    [key: string]: number;
}

export interface iExpenseDetails {
    total: number;
    individualExpenses: iIndividualExpenses;
}

export interface iShareDetails {
    equalShare: number;
    owes: iOwesOwed;
    owed: iOwesOwed;
}

export interface iPayout {
    traveller_name: string;
    traveller_owed: string;
    amount: number;
}
