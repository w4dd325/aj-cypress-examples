describe('Search API', () => {
    const searchEndpoint = (query) => `https://api.chucknorris.io/jokes/search?query=${query}`;
  
    it('Searches for jokes containing "pain"', () => {
      cy.request(searchEndpoint('pain')).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result).to.be.an('array').that.is.not.empty;
      });
    });
  
    it('Ensures searched jokes contain query word', () => {
      cy.request(searchEndpoint('pain')).should((response) => {
        response.body.result.forEach((joke) => {
          expect(joke.value.toLowerCase()).to.include('pain');
        });
      });
    });
  
    it('Handles searches with no results gracefully', () => {
      cy.request(searchEndpoint('nonexistentword')).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.result).to.be.an('array').that.is.empty;
      });
    });
  });