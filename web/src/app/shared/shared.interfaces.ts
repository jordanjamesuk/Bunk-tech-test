export interface iTraveller {
    id: string;
    traveller_name: string;
    expense: number;
}

export interface iPayouts {
    traveller_name: string;
    amount: number;
    traveller_owed: string;
}

export interface iAllPayouts {
    total: number;
    equalShare: number;
    payouts: iPayouts[];
}

export type iTravellerNoId = Omit<iTraveller, 'id'>;
