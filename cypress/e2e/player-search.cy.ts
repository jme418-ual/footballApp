describe('Player creation', () => {

  it('should create player', () => {

    cy.visit('/login');

    cy.get('input[type="email"]')
      .type('test@test.com');

    cy.get('input[type="password"]')
      .type('123456');

    cy.contains('Login').click();

    cy.visit('/players/create');

    cy.get('input').eq(0)
      .type('Jugador Test');

    cy.get('input').eq(1)
      .type('Equipo Test');

    cy.get('input').eq(2)
      .type('Liga Test');

    cy.contains('Crear jugador').click();

    cy.contains('Jugador creado correctamente');
  });

});