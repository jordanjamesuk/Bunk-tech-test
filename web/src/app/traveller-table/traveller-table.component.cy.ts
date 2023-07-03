import { HttpClientModule } from '@angular/common/http';
import { TravellerTableComponent } from './traveller-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TravellerFormComponent } from '../traveller-form/traveller-form.component';
import { PayoutTableComponent } from '../payout-table/payout-table.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TravellerFormComponent', () => {
    beforeEach(() => {
        cy.mount(TravellerTableComponent, {
            declarations: [TravellerFormComponent, PayoutTableComponent],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatButtonModule,
                HttpClientModule,
                MatTableModule,
            ],
        });
    });

    it('Traveller table exists', () => {
        cy.get('[data-cy="traveller-table"]').should('be.visible');
    });

    it('Should show error when table is empty', () => {
        cy.get('table tr').its('length').should('equal', 1);
        cy.get('[data-cy="no-data-error"]').should('be.visible');
    });

    it('Should add mock data to table', () => {
        cy.get('table tr').its('length').should('equal', 1);
        cy.get('[data-cy="mock-data-button"]').click();
        cy.get('table tr').its('length').should('equal', 5);
    });

    it('Should show no error when table is populated', () => {
        cy.get('[data-cy="mock-data-button"]').click();
        cy.get('[data-cy="no-data-error"]').should('not.exist');
    });

    it('Should remove row from table', () => {
        cy.get('[data-cy="mock-data-button"]').click();
        cy.get('table tr').its('length').should('equal', 5);
        cy.get('table tr:nth-child(1) > td > button').click();
        cy.get('table tr').its('length').should('equal', 4);
    });

    it('Should clear traveller table', () => {
        cy.get('[data-cy="mock-data-button"]').click();
        cy.get('table tr').its('length').should('equal', 5);
        cy.get('[data-cy="clear-data-button"]').click();
        cy.get('table tr').its('length').should('equal', 1);
    });

    it('Should show Add Traveller component', () => {
        cy.get('.traveller-expense-button').click();
        cy.get('[data-cy="add-traveller-display"]').should('be.visible');
    });

    it('Should show Payout table', () => {
        // mock request
        cy.intercept('POST', '/payouts', {
            total: 29,
            equalShare: 14.5,
            payouts: [
                {
                    traveller_name: 'TEST',
                    traveller_owed: 'TEST2',
                    amount: 7.25,
                },
            ],
        });
        cy.get('[data-cy="mock-data-button"]').click();
        cy.get('[data-cy="settle-up-data-button"]').click();
        cy.get('[data-cy="payout-display"]').should('be.visible');
    });

    it('Should clear both tables', () => {
        // mock request
        cy.intercept('POST', '/payouts', {
            total: 29,
            equalShare: 14.5,
            payouts: [
                {
                    traveller_name: 'TEST',
                    traveller_owed: 'TEST2',
                    amount: 7.25,
                },
            ],
        });
        cy.get('[data-cy="mock-data-button"]').click();
        cy.get('[data-cy="settle-up-data-button"]').click();
        cy.get('[data-cy="payout-display"]').should('be.visible');
        cy.get('[data-cy="clear-data-button"]').click();
        cy.get('[data-cy="payout-display"]').should('not.exist');
        cy.get('table tr').its('length').should('equal', 1);
    });
});
