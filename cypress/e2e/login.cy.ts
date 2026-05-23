describe('Login', () => {

  it('should open login page', () => {
    cy.visit('/login');

    cy.contains('Login').should('be.visible');
  });

});