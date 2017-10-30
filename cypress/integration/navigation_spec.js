describe('Visit homepage', function () {
  it('Visits the home page', function () {
    cy.visit('http://localhost:8080')
  })
})

describe('Test Navigation', function () {
  it('Cliks the menu toggle', function () {
    cy.get('.toolbar__side-icon.btn.btn--icon.btn--raised').click()
  })
  it('Clicks the Home button', function () {
    cy.contains('home').click()
  })
})

describe('Create New Reservation', function () {
  it('Clicks the plus', function () {
    cy.contains('add').click()
    cy.url().should('include', '/create-reservation')
  })
  it('Fills out the information', function () {
    let timeValue = Date.now()
    cy.get('input[aria-label="Meeting Name"]')
      .type('Meeting: ' + timeValue)
      .should('have.value', 'Meeting: ' + timeValue)

    cy.get('input[aria-label="Owner Name"]')
      .type('Bob ' + timeValue)
      .should('have.value', 'Bob ' + timeValue)

    cy.get('input[aria-label="Owner E-mail"]')
      .type(timeValue + '@email.com')
      .should('have.value', timeValue + '@email.com')

    cy.get('input[aria-label="Start Date"]')
      .click()
    cy.get('.btn--flat.btn--active').click()
    cy.contains('OK').click()

    cy.get('input[aria-label="End Date"]')
      .click()
    cy.get('.picker__body .btn--flat.btn--active').first().click()
    cy.contains('OK').click()
    
  })
})