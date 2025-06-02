/// <reference types="cypress" />

describe('Modal', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?*',
        query: { language: 'pt-BR' }
      },
      { fixture: 'base-movies.json' }
    ).as('getMovies');
    cy.intercept(
      {
        method: 'GET',
        url: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?*',
        query: { language: 'pt-BR' }
      },
      { fixture: 'highlight-movie.json' }
    ).as('getHighlight');
    cy.visit(Cypress.env('server'));
  });
  it('Modal é aberto com filme "O Esquadrão Suicida"', () => {
    cy.wait('@getMovies').then(() => {
      cy.get('.movie').first().click();
      cy.wait('@getHighlight').then(() => {
        cy.get('.modal__title').should('contain', 'O Esquadrão Suicida');
        cy.get('.modal__img').should(
          'have.attr',
          'src',
          'https://image.tmdb.org/t/p/original/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg'
        );
      });
    });
  });
  it('Modal é fechado (clique no X)', () => {
    cy.wait('@getMovies').then(() => {
      cy.get('.movie').first().click();
      cy.wait('@getHighlight').then(() => {
        cy.get('.modal__close').click();
        cy.get('.modal').should('have.class', 'hidden');
      });
    });
  });
  it('A quantidade de gêneros deve ser a igual a 2 se abrir o filme "Viúva Negra" -> fechar o modal -> depois abrir o filme "O Último Mercenário"', () => {
    cy.wait('@getMovies').then(() => {
      cy.get('.movie').contains('Viúva Negra').click();
      cy.wait('@getHighlight').then(() => {
        cy.get('.modal__genres .modal__genre').should('have.length', 3);
        cy.get('.modal__close').click();
        cy.get('.movie').contains('O Último Mercenário').click();
        cy.get('.modal__genres .modal__genre').should('have.length', 2);
      });
    });
  });
});
