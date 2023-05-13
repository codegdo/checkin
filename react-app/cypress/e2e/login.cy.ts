/// <reference types="Cypress" />

describe('login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.get('[name="username"]').type('owner');
    cy.get('[name="password"]').type('123456');
    cy.get('[name="submit"]').click();
    cy.url().should('include', '/');
    cy.get('[href="/auth/logout"]').click();
  })
})

// fix isolatedModules in tsconfig
export { }

/*
  jest test logic/business-logic 
  cypress test e2e/component/page

  Write a test case that does the following:
  ---
  Visits the login page.
  Fills in the username and password fields.
  Clicks the Login button.
  Asserts that the user is redirected to the correct page.
  Logs out the user.
*/