/// <reference types="cypress" />

describe('Busca', () => {
  context('Após realização da busca pelo termo "Batman"', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: 'https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?*',
          query: { language: 'pt-BR', query: 'Batman' }
        },
        { fixture: 'batman-search.json' }
      ).as('batmanSearch');
      cy.intercept(
        {
          method: 'GET',
          url: 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?*',
          query: { language: 'pt-BR' }
        },
        { fixture: 'base-movies.json' }
      ).as('getMovies');
      cy.visit(Cypress.env('server'));
      cy.get('.input').type('Batman{enter}');
    });
    it('Só funciona com a tecla Enter', () => {
      cy.wait('@batmanSearch').then(() => {
        cy.get('.input').type('Sonic');
        cy.get('.movie .movie__title').should('contain', 'Batman');
      });
    });
    it('Limpa o campo após trazer os resultados', () => {
      cy.wait('@batmanSearch').then(() => {
        cy.get('.input').should('contain', '');
      });
    });
    it('Volta para o resultado inicial se pressionar Enter com o campo vazio', () => {
      cy.get('.btn-next').click();
      cy.wait('@batmanSearch').then(() => {
        cy.get('.input').type('{enter}');
        cy.get('.movie .movie__title').should('contain', 'O Esquadrão Suicida');
      });
    });
    it('Renderiza os resultados buscados com o título do primeiro filme deve conter "Batman"', () => {
      cy.get('.movie:first-child .movie__title').should('contain', 'Batman');
    });
    it('Modal deve abrir se clicar no primeiro filme e o título do modal deve conter "Batman"', () => {
      cy.get('.movie:first-child').click();
      cy.get('.modal__title').should('contain', 'Batman');
    });
    context('Paginação deve funcionar', () => {
      it('Se voltar, o primeiro filme deve ser "Batman e o Longo Dia das Bruxas - Parte 1"', () => {
        cy.get('.btn-prev').click();
        cy.get('.movie:first-child .movie__title').should(
          'contain',
          'Batman e o Longo Dia das Bruxas - Parte 1'
        );
      });
      it('Se avançar, o último filme deve ser "Batman: Morte em Família"', () => {
        cy.get('.btn-next').click();
        cy.get('.movie:last-child .movie__title').should(
          'contain',
          'Batman e Arlequina: Pancadas e Risadas'
        );
      });
    });
  });
});
