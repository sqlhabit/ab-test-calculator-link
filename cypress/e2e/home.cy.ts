describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the correct heading', () => {
    cy.get('h1')
      .should('exist')
      .and('contain.text', 'A/B Test Calculator')
  })
})
