/// <reference types="cypress" />

describe('Crear y eliminar paciente con coincidencia completa', () => {
  const paciente = {
    nombre: 'Coco',
    propietario: 'Laura',
    email: 'laura@correo.com',
    fecha: '2025-11-23',
    sintomas: 'Vacuna de la rabia.'
  };

  beforeEach(() => {
    // Interceptar confirmación de eliminación
    cy.on('window:confirm', () => true);

    // Login
    cy.visit('/');
    cy.get('input[name="email"]').type('pruebas@correo.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/admin');
  });

  it('debería crear y luego eliminar un paciente correctamente', () => {
    // Rellenar formulario sin encadenar clear().type()
    cy.get('#nombre').clear();
    cy.get('#nombre').type(paciente.nombre);

    cy.get('#propietario').clear();
    cy.get('#propietario').type(paciente.propietario);

    cy.get('#email').clear();
    cy.get('#email').type(paciente.email);

    cy.get('#fecha').clear();
    cy.get('#fecha').type(paciente.fecha);

    cy.get('#sintomas').clear();
    cy.get('#sintomas').type(paciente.sintomas);

    cy.get('input[type="submit"]').click();

    // Verificar que todos los datos aparecen
    cy.contains(paciente.nombre).should('exist');
    cy.contains(paciente.propietario).should('exist');
    cy.contains(paciente.email).should('exist');
    cy.contains('23 de noviembre de 2025').should('exist'); // Fecha formateada
    cy.contains(paciente.sintomas).should('exist');

    // Interceptar DELETE
    cy.intercept('DELETE', '**/api/pacientes/**').as('eliminarPaciente');

    // Eliminar paciente con coincidencia múltiple
    cy.contains(paciente.nombre)
      .parents('[class*="shadow"]')
      .within(() => {
        cy.contains(paciente.propietario).should('exist');
        cy.contains(paciente.email).should('exist');
        cy.contains(paciente.sintomas).should('exist');
        cy.contains('Eliminar').click();
      });

    // Esperar confirmación del backend
    cy.wait('@eliminarPaciente');

    // Verificar que todos los datos desaparecen
    cy.contains(paciente.email, { timeout: 6000 }).should('not.exist');
    cy.contains(paciente.sintomas).should('not.exist');
  });
});
