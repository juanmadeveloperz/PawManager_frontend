/// <reference types="cypress" />
describe('Login de veterinario', () => {
  it('debería loguearse correctamente', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[name="email"]').type('pruebas@correo.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/admin');
    cy.contains('Administrador de Pacientes').should('exist');
  });
});
