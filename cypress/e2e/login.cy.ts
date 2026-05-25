describe('Login', () => {

  it('should login correctly', () => {

    cy.visit('/login');

    cy.get('input[type="email"]')
      .type('test@test.com');

    cy.get('input[type="password"]')
      .type('123456');

    cy.contains('Login').click();

    cy.url().should('include', '/players');
  });

});