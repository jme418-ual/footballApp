describe('Player search', () => {

  it('should open player search page', () => {
    cy.visit('/players/search');

    cy.contains('Buscar jugadores').should('be.visible');
  });

});