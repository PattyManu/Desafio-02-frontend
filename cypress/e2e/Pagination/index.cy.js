/// <reference types="cypress" />

describe('Paginação', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?*',
        query: { language: 'pt-BR' }
      },
      { fixture: 'base-movies.json' }
    ).as('getMovies');
    cy.visit(Cypress.env('server'));
  });
  it('Próxima página é renderizada com o primeiro filme "Velozes & Furiosos 9: A Saga Velozes & Furiosos"', () => {
    cy.wait('@getMovies').then(() => {
      cy.get('.btn-next').click();
      cy.get('.movie')
        .first()
        .should('contain', 'Velozes & Furiosos 9: A Saga Velozes & Furiosos');
    });
  });
  it('Se avançar uma página e retornar, página anterior é renderizada com o primeiro filme "O Esquadrão Suicida"', () => {
    cy.wait('@getMovies').then(() => {
      cy.get('.btn-next').click();
      cy.get('.btn-prev').click({ force: true });
      cy.get('.movie').first().should('contain', 'O Esquadrão Suicida');
    });
  });
  it('Voltar da primeira página leva o usuário para a última com o primeiro filme "Cruella"', () => {
    cy.wait('@getMovies').then(() => {
      cy.get('.btn-prev').click();
      cy.get('.movie').first().should('contain', 'Cruella');
    });
  });
  it('Avançar da última página leva o usuário para a primeira com o primeiro filme "O Esquadrão Suicida"', () => {
    cy.wait('@getMovies').then(() => {
      cy.get('.btn-prev').click();
      cy.get('.btn-next').click();
      cy.get('.movie').first().should('contain', 'O Esquadrão Suicida');
    });
  });
});
