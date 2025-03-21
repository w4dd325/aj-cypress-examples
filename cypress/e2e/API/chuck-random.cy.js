describe('Random Joke API', () => {
    const endpoint = 'https://api.chucknorris.io/jokes/random';
  
    it('Fetches a random joke', () => {
      cy.request(endpoint).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('value').that.is.a('string');
      });
    });
  
    it('Checks response headers for content type', () => {
      cy.request(endpoint).should((response) => {
        expect(response.headers).to.have.property('content-type').that.includes('application/json');
      });
    });
  
    it('Ensures API response time is under 500ms', () => {
      cy.request(endpoint).should((response) => {
        expect(response.duration).to.be.lessThan(500);
      });
    });

    it('Ensures API does not block multiple requests in a short time', () => {
        for (let i = 0; i < 5; i++) {
          cy.request(endpoint).should((response) => {
            expect(response.status).to.eq(200);
          });
        }
    });
    
    it('Ensures each joke is unique over 5 tries', () => {
      //Note: Not the best example as "random" could in fact return the same joke
      //      but it is a good example of using a for each and "Set" to store unique values.
      
      let jokes = new Set(); // Sets only keep unique values
  
      // Create an array of requests
      cy.wrap(Array.from({ length: 5 })).each(() => {
        cy.request('https://api.chucknorris.io/jokes/random').then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('value').that.is.a('string');
  
          // Store the joke text
          jokes.add(response.body.value);
        });
      }).then(() => {
        // Assert that all 5 jokes are unique
        expect(jokes.size).to.eq(5);
      });
    });
  });