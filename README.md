# 🧪 Cypress E2E Demo – Gestión de Pacientes Veterinarios

Este proyecto demuestra cómo implementar pruebas End-to-End (E2E) con Cypress en una aplicación React para gestión de pacientes veterinarios. Se automatizan los flujos clave del sistema, validando tanto la lógica de negocio como la interfaz de usuario.

---

## 🚀 Funcionalidades testeadas

- 🔐 Login de veterinario
- 📝 Creación de paciente
- ❌ Eliminación de paciente
- 👀 Validación visual en la UI
- 📡 Confirmación de acciones vía intercept

---

## 🛠 Tecnologías utilizadas

| Tecnología     | Uso                             |
|----------------|----------------------------------|
| React + Vite   | Frontend                        |
| Cypress        | Testing End-to-End              |
| Node.js        | Backend y API REST              |
| TailwindCSS    | Estilos UI                      |
| ESLint + Prettier | Calidad y formato de código |

---

## 📁 Estructura del proyecto

cypress/ 
└── e2e/ 
  ├── login.cy.jsx 
  └── crearEliminarPaciente.cy.jsx


---

## 📌 Ejemplo de test: Crear y eliminar paciente

```jsx
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
    cy.get('#nombre').clear(); cy.get('#nombre').type(paciente.nombre);
    cy.get('#propietario').clear(); cy.get('#propietario').type(paciente.propietario);
    cy.get('#email').clear(); cy.get('#email').type(paciente.email);
    cy.get('#fecha').clear(); cy.get('#fecha').type(paciente.fecha);
    cy.get('#sintomas').clear(); cy.get('#sintomas').type(paciente.sintomas);
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

🧪 Cómo ejecutar los tests

# Instalar dependencias
npm install

# Levantar el frontend
npm run dev

# Abrir Cypress en modo interactivo
npx cypress open

📘 Aprendizaje
Este proyecto muestra:

Cómo automatizar flujos completos en React con Cypress

Validación visual y funcional de la UI

Uso de interceptores para controlar peticiones HTTP

Buenas prácticas en testing E2E para entornos reales

👤 Autor
Proyecto creado por Juan M. Espino Pastor

  


