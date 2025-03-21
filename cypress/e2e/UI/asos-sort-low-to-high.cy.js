describe.skip('Asos UI Mobile View Examples', () => {

  beforeEach(() => {
    //Set the viewport to mobile view
    cy.viewport('iphone-xr');
  })

  it('should order low to high', () => {
    //Visit the Asos website
    cy.visit('https://www.asos.com/')
    //Accept the cookies
    cy.get('#onetrust-accept-btn-handler').click();
    //Click on the burger menu
    cy.get('.BKBoO9a').click();
    //Click on "Clothing" category
    cy.get('[aria-labelledby="women-floor"] > .JV5i3vh > :nth-child(3) > [data-testid="list-container"] > :nth-child(2) > [data-testid="menu-item"] > .vGlzNBR > span').click();
    //Click on "New In" category
    cy.get('.JttiF1G > .g7Hg9qa > :nth-child(1) > :nth-child(2) > [data-testid="list-container"] > :nth-child(3) > .u1K3F0B').click();
    //Assert the category title
    cy.get('.categoryHeaderTitle_yz37D').should('have.text', 'Women\'s New In: Clothing');
    //Click on the sort button
    cy.get('#sortBy').select('priceasc');
    //Assert the first product name
    cy.get('#pta-product-207838787-0').should('have.text', 'COLLUSION Unisex t-shirt in purple');
    //Assert the first product price
    cy.get('#pta-product-207838787-1 > .originalPrice_jEWt1 > .price__B9LP').should('have.text', '£6.99');
  })
})