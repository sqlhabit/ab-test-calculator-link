describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/?cs=1000&cc=24&vs=1000&vc=54')
  })

  it('displays the correct heading', () => {
    cy.get('h1')
      .should('exist')
      .and('contain.text', 'A/B Test Calculator')

    cy.contains('Statistically significant at 95% confidence level')
      .should('exist')
  })
})
