describe('Home Page', () => {
  beforeEach(() => {
    const baseUrl = 'http://localhost:5173/ab-test-calculator-link/'
    const url = `${baseUrl}#/?cs=1000&cc=24&vs=1000&vc=54`

    cy.task("log", `--> Visiting URL: ${url}`)

    cy.visit(url)
  })

  it('displays the correct heading', () => {
    cy.get('h1')
      .should('exist')
      .and('contain.text', 'A/B Test Calculator')

    cy.contains('Statistically significant at 95% confidence level')
      .should('exist')
  })
})
