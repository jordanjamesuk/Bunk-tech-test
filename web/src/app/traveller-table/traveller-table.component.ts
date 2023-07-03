import { Component } from '@angular/core';
import {
    iAllPayouts,
    iTraveller,
    iTravellerNoId,
} from '../shared/shared.interfaces';
import { create_mock_object } from '../shared/shared.utils';
import { v4 as uuid4 } from 'uuid';
import { SettleUpService } from '../services/settle-up.service';

/**
 * TravellerTableComponent.
 */
@Component({
    selector: 'traveller-table',
    templateUrl: './traveller-table.component.html',
    styleUrls: ['./traveller-table.component.css'],
})
export class TravellerTableComponent {
    constructor(public settleUpService: SettleUpService) {}

    form_display: boolean = false;
    payout_display: boolean = false;
    traveller_data: iTraveller[] = [];
    payoutDetails: iAllPayouts = {} as iAllPayouts;
    displayedColumns: string[] = ['Traveller Name', 'Expense', 'Actions'];

    /**
     * settleUp - Post data to API and display response in payout table.
     */
    settleUp() {
        if (this.traveller_data.length === 0) return;

        this.settleUpService
            .settleUp({ expenses: this.traveller_data })
            .subscribe((data) => {
                this.payoutDetails = data;
                this.payout_display = true;
            });
    }

    /**
     * remove_row - Remove row from traveller data table.
     *
     * @param {iTraveller} data - Traveller data to be removed.
     */
    remove_row(data: iTraveller) {
        // if the traveller data length is one, then remove payout details, and remove payout table
        if (this.traveller_data.length === 1) {
            this.payoutDetails = {} as iAllPayouts;
            this.payout_display = false;
        }

        // filter out traveller data
        this.traveller_data = this.traveller_data.filter(
            (traveller: iTraveller) => traveller.id !== data.id
        );

        // if the payout table is on display, and the traveller data is more than or equal to 1 then continue to settle up
        if (this.payout_display && this.traveller_data.length >= 1)
            this.settleUp();
    }

    /**
     * add_mock_data - Add hardcoded mock data to traveller data table.
     */
    add_mock_data() {
        this.append_traveller_expenses(create_mock_object());
    }

    /**
     * add_traveller - Add traveller to traveller data table.
     *
     * @param {iTravellerNoId} data - traveller data to add to table.
     */
    add_traveller(data: iTravellerNoId) {
        this.append_traveller_expenses([
            {
                id: uuid4(),
                traveller_name: data.traveller_name,
                expense: data.expense,
            },
        ]);
    }

    /**
     * clear_table - clear the traveller data table.
     */
    clear_table() {
        this.payout_display = false;
        this.payoutDetails = {} as iAllPayouts;
        this.traveller_data = [];
    }

    /**
     * toggle_form - toggle the display of the traveller form.
     */
    toggle_form() {
        this.form_display = !this.form_display;
    }

    /**
     * append_traveller_expenses - Add data to the traveller data table.
     *
     * @param {iTraveller | iTraveller[]} data - Either a traveller object, or a list of traveller objects to add to traveller data table
     */
    append_traveller_expenses(data: iTraveller | iTraveller[]) {
        if (Array.isArray(data as iTraveller[])) {
            this.traveller_data = [
                ...this.traveller_data,
                ...(data as iTraveller[]),
            ];
        } else {
            this.traveller_data = [...this.traveller_data, data as iTraveller];
        }

        // if the payout table is on display, settle up again
        if (this.payout_display) this.settleUp();
    }
}
