/// <reference types="cypress" />

describe('Highlight', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?*',
        query: { language: 'pt-BR' }
      },
      { fixture: 'highlight-movie.json' }
    ).as('getHighlight');
    cy.intercept(
      {
        method: 'GET',
        url: 'https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?*',
        query: { language: 'pt-BR' }
      },
      { fixture: 'highlight-video.json' }
    ).as('getHighlightVideo');
    cy.visit(Cypress.env('server'));
  });
  it('Vídeo do Highlight está correto com a url do vídeo do Youtube "Bastidores | O Esquadrão Suicida | HBO Max"', () => {
    cy.wait('@getHighlightVideo').then(() => {
      cy.get('.highlight__video-link').should(
        'have.attr',
        'href',
        'https://www.youtube.com/watch?v=VO_oW4GDy7o'
      );
    });
  });
  it('Título do Highlight renderizado correto do filme "O Esquadrão Suicida', () => {
    cy.wait('@getHighlight').then(() => {
      cy.get('.highlight__title').should('contain', 'O Esquadrão Suicida');
    });
  });
  it('Gêneros do Highlight corretos do filme "O Esquadrão Suicida', () => {
    cy.wait('@getHighlight').then(() => {
      cy.get('.highlight__genres').should('contain', 'Ação, Aventura, Fantasia');
    });
  });
  it('Nota do Highlight correto do filme "O Esquadrão Suicida', () => {
    cy.wait('@getHighlight').then(() => {
      cy.get('.highlight__genres').should('contain', 'Ação, Aventura, Fantasia');
    });
  });
  it('Descrição do Highlight correta com os dados do filme "O Esquadrão Suicida"', () => {
    cy.wait('@getHighlight').then(() => {
      cy.get('.highlight__description').should(
        'contain',
        'Os supervilões Harley Quinn (Margot Robbie), Bloodsport (Idris Elba), Peacemaker (John Cena) e uma coleção de malucos condenados da prisão de Belle Reve juntam-se à super-secreta e super-obscura Força Tarefa X, enquanto são deixados na remota ilha de Corto Maltese para combater o inimigo.'
      );
    });
  });
  it('A data do filme de destaque deve ser "28 de julho de 2021"', () => {
    cy.wait('@getHighlight').then(() => {
      cy.get('.highlight__launch').should('contain', '28 de julho de 2021');
    });
  });
  it('Imagem do Highlight correto do filme "O Esquadrão Suicida', () => {
    cy.wait('@getHighlight').then(() => {
      cy.get('.highlight__video').should('have.css', 'background').
      and('include', 'url("https://image.tmdb.org/t/p/original/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg")');
    });
  });
  it('Centralização da imagem do Highlight correto do filme "O Esquadrão Suicida', () => {
    cy.get('.highlight__video').should('have.css', 'background').
      and('include', 'cover');
  });
});
