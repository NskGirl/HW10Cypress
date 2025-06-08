// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('SentRequest', (endpoint, method, body) => {

  cy.request({
    url: endpoint,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'pk_188600779_71MAGF149IE3VEDX0R3DF4YLRH30PEAN'
    },
    failOnStatusCode: false,
    body: body
  })
})

Cypress.Commands.add('CreateGoal', () => {
  cy.SentRequest('team/90151117657/goal', 'POST', {"name": faker.internet.email()})
})

Cypress.Commands.add('DeleteGoal', (url) => {
  cy.SentRequest(url, 'DELETE')
})

Cypress.Commands.add('GetGoal', (url) => {
  cy.SentRequest(url, 'GET')
})