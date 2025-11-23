🧪 Testing End-to-End con Cypress – Login y Gestión de Pacientes

Este repositorio muestra cómo implementar pruebas E2E (end-to-end) con Cypress en una aplicación de gestión de pacientes veterinarios.
Se automatizan los siguientes flujos principales:

✅ Login de veterinario
🆕 Creación de un paciente
🗑️ Eliminación del paciente
✔ Validación visual y funcional en la UI
🔄 Confirmación de backend con cy.intercept()


🚀 Tecnologías Utilizadas
Tecnología	Uso
React.js	Interfaz del sistema de pacientes
Cypress	Testing End-to-End
Vite	Entorno de desarrollo frontend
Node.js	Backend y API
TailwindCSS	Estilos UI
ESLint + Prettier	Calidad y formateo de código
📂 Estructura del Proyecto (Tests E2E)
cypress/
 └── e2e/
     ├── login.cy.js
     └── crearEliminarPaciente.cy.js

🧪 Test 1 – Login (login.cy.js)
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

🧪 Test 2 – Crear y Eliminar Paciente (crearEliminarPaciente.cy.js)
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
    cy.on('window:confirm', () => true);

    cy.visit('/');
    cy.get('input[name="email"]').type('pruebas@correo.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/admin');
  });

  it('debería crear y luego eliminar un paciente correctamente', () => {
    cy.get('#nombre').clear().type(paciente.nombre);
    cy.get('#propietario').clear().type(paciente.propietario);
    cy.get('#email').clear().type(paciente.email);
    cy.get('#fecha').clear().type(paciente.fecha);
    cy.get('#sintomas').clear().type(paciente.sintomas);
    cy.get('input[type="submit"]').click();

    cy.contains(paciente.nombre).should('exist');
    cy.contains(paciente.propietario).should('exist');
    cy.contains(paciente.email).should('exist');
    cy.contains('23 de noviembre de 2025').should('exist');
    cy.contains(paciente.sintomas).should('exist');

    cy.intercept('DELETE', '**/api/pacientes/**').as('eliminarPaciente');

    cy.contains(paciente.nombre)
      .parents('[class*="shadow"]')
      .within(() => {
        cy.contains('Eliminar').click();
      });

    cy.wait('@eliminarPaciente');

    cy.contains(paciente.email, { timeout: 6000 }).should('not.exist');
    cy.contains(paciente.sintomas).should('not.exist');
  });
});

▶️ Cómo ejecutar los tests
# Instalar dependencias
npm install

# Levantar el proyecto (necesario para hacer los test en el front)
npm run dev

# Abrir Cypress en modo interactivo
npx cypress open

# Ejecutar en modo headless
npx cypress run

🌟 ¿Qué validan estos tests?
Validación	Estado
Autenticación (login)	✔
CRUD (Create + Delete)	✔
UI + API conectadas correctamente	✔
Interceptación de requests con cy.intercept()	✔
Verificación de contenido dinámico y fecha formateada	✔
💡 Mejoras futuras

🔹 Automatizar la edición de un paciente
🔹 Implementar Page Objects
🔹 Integración con CI/CD (GitHub Actions)
🔹 Reportes visuales (Allure / Mochawesome)

📌 Proyecto creado con fines educativos y de demostración profesional.