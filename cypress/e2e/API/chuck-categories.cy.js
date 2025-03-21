describe('Category API', () => {
    const categoriesEndpoint = 'https://api.chucknorris.io/jokes/categories';
    const categoryJokeEndpoint = (category) => `https://api.chucknorris.io/jokes/random?category=${category}`;
  
    it('Retrieves list of joke categories', () => {
      cy.request(categoriesEndpoint).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').that.includes('animal');
      });
    });
  
    it('Fetches a joke from "animal" category', () => {
      cy.request(categoryJokeEndpoint('animal')).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('value');
      });
    });
  
    it('Handles invalid category gracefully', () => {
      cy.request({
        method: 'GET',
        url: categoryJokeEndpoint('invalidCategory'),
        failOnStatusCode: false
      }).should((response) => {
        expect(response.status).to.eq(404);
      });
    });

  });