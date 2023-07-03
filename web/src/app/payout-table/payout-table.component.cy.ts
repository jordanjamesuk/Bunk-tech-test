import { iAllPayouts } from '../shared/shared.interfaces';
import { PayoutTableComponent } from './payout-table.component';
import { MatTableModule } from '@angular/material/table';

describe('PayoutTableComponent', () => {
    let testData: iAllPayouts;
    beforeEach(() => {
        testData = {
            total: 29,
            equalShare: 14.5,
            payouts: [
                {
                    traveller_name: 'Test',
                    traveller_owed: 'Test_2',
                    amount: 5,
                },
            ],
        };

        cy.mount(PayoutTableComponent, {
            componentProperties: {
                payoutData: testData,
            },
            imports: [MatTableModule], // Import Angular Material Table module
        });
    });

    it('should have a total', () => {
        cy.get('[data-cy=payout-total]').should('be.visible');
        cy.get('[data-cy=payout-total]').should(
            'contain',
            `Total: £${testData.total}`
        );
    });

    it('should have equal share', () => {
        cy.get('[data-cy=payout-equalshare]').should('be.visible');
        cy.get('[data-cy=payout-equalshare]').should(
            'contain',
            `Equal Shares: £${testData.equalShare}`
        );
    });

    it('should display table with data', () => {
        // Check if table is visible
        cy.get('[data-cy=payout-table]').should('be.visible');

        // Check if table contains the correct headers
        cy.get('table th').eq(0).should('contain', 'Traveller Name');
        cy.get('table th').eq(1).should('contain', 'Expense');
        cy.get('table th').eq(2).should('contain', 'Owed');

        // Check if the table contains some data
        cy.get('table tr').its('length').should('be.gt', 1);
        cy.get('table td').should(
            'contain',
            testData.payouts[0].traveller_name
        );
        cy.get('table td').should(
            'contain',
            testData.payouts[0].traveller_owed
        );
        cy.get('table td').should('contain', testData.payouts[0].amount);
    });
});
