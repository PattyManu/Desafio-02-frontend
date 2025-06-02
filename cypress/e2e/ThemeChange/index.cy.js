/// <reference types="cypress" />

describe('Troca de tema', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('server'));
    localStorage.removeItem('theme');
  });
  it('Permitir troca do tema claro para escuro', () => {
    cy.get('.btn-theme').click();
    cy.get('.btn-theme').should('have.attr', 'src', './assets/dark-mode.svg');
    cy.get('body').should('have.css', 'background-color', 'rgb(27, 32, 40)');
  });
  it('Permitir troca de tema escuro para claro', () => {
    cy.get('.btn-theme').click();
    cy.get('.btn-theme').click();
    cy.get('.btn-theme').should('have.attr', 'src', './assets/light-mode.svg');
    cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});
