describe('My First Test', () => {
    it('User flow from the Kitchen Sink to Utilities page', () => {

        // Visit the Kitchen Sink
        cy.visit('https://example.cypress.io')

        // Assert the Kitchen Sink header is visible and contains the expected text
        cy.get('h1')
            .should('be.visible')
            .should('have.text', 'Kitchen Sink');

        // Assert the Commands sub-header is visible and contains the expected text
        cy.get(':nth-child(3) > .container > .row > #utilities > h2')
            .should('be.visible')
            .should('have.text', 'Commands');

        // Assert the Querying link is visible and contains the expected text and then click on it
        cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)')
            .should('have.attr', 'href', '/commands/querying')
            .should('be.visible')
            .should('have.text', 'Querying')
            .click();

        // Assert the button is visible and enabled and then click on it

        // Get the current minute
        const minute = new Date().getMinutes();
        // If the current minute is even, click on the button
        if (minute % 2 === 0) {
            cy.log('Even minute - Click the button');
            cy.get('#query-btn')
                .should('be.visible')
                .should('be.enabled')
                .click();
        }
        // If the current minute is odd, log the action
        else {
            cy.log('Odd minute - Doing nothing');
        }

        // Assert the input field is visible and enabled and then type in it
        cy.get('#inputName')
            .should('be.visible')
            .should('be.enabled')
            .should('have.id', 'inputName')
            .type('testing');

        // Click on the Utilities link in the navbar
        cy.get('#navbar > :nth-child(1) > :nth-child(2) > a')
            .click();

        // Assert the Utilities header is visible and contains the expected text
        cy.get('h1')
            .should('be.visible')
            .should('have.text', 'Utilities');

    })
})