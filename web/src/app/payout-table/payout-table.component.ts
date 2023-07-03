import { Component, Input } from '@angular/core';
import { iAllPayouts } from '../shared/shared.interfaces';

@Component({
    selector: 'payout-table',
    templateUrl: './payout-table.component.html',
    styleUrls: ['./payout-table.component.css'],
})
export class PayoutTableComponent {
    @Input() payoutData: iAllPayouts = {} as iAllPayouts;

    displayedColumns: string[] = [
        'Traveller Name',
        'Expense',
        'Traveller Owed',
    ];
}
