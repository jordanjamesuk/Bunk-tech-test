import { FormsModule } from '@angular/forms';
import { TravellerFormComponent } from './traveller-form.component';
import { createOutputSpy } from 'cypress/angular';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

describe('TravellerFormComponent', () => {
    beforeEach(() => {
        cy.mount(TravellerFormComponent, {
            imports: [
                MatButtonModule,
                BrowserAnimationsModule,
                FormsModule,
                MatInputModule,
                MatFormFieldModule,
            ],
            componentProperties: {
                eTravellerForm: createOutputSpy('emittedDataSpy'),
            },
        });
    });

    it('renders correctly', () => {
        cy.get('#traveller_name').should('exist');
        cy.get('#expense').should('exist');
    });

    it('validates inputs correctly', () => {
        // Try to submit the form without filling it out
        cy.get('#traveller_name').click();
        cy.get('#expense').click();
        cy.get('#traveller_name').click();
        cy.get('div:contains("Traveller Name is required.")').should('exist');
        cy.get('div:contains("Expense is required.")').should('exist');

        // Fill out the form and check that the error messages disappear
        cy.get('#traveller_name').type('John Doe');
        cy.get('#expense').type('50');
        cy.get('div:contains("Traveller Name is required.")').should(
            'not.exist'
        );
        cy.get('div:contains("Expense is required.")').should('not.exist');
    });

    it('submits correctly', () => {
        cy.get('#traveller_name').type('John Doe');
        cy.get('#expense').type('50');
        cy.get('button[type="submit"]').click();

        // Check that the form was reset
        cy.get('#traveller_name').should('have.value', '');
        cy.get('#expense').should('have.value', '');

        // Check that the correct data was emitted
        cy.get('@emittedDataSpy')
            .its('firstCall.args.0')
            .should((args) => {
                expect(args.traveller_name).to.equal('John Doe');
                expect(args.expense).to.equal(50);
            });
    });
});
