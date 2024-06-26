/* global cy */
/* global context */

import * as React from 'react'
import Table from './Table'
import App from '../App'
import '../index.css'

const allCustomers = [
  { id: 1, name: "Jon's BigSales", employees: 5000, size: 'very large enterprise' },
  { id: 2, name: 'WaMall', employees: 50, size: 'small' },
  { id: 3, name: 'TestMall', employees: 500, size: 'medium' },
  { id: 4, name: 'TATMall', employees: 550, size: 'medium' }
]

describe('Table component', () => {
  context('Table Tests', () => {
    beforeEach(() => {
      cy.mount(<Table customers={allCustomers} />)
    })

    it("Shows a list of customers when there's data in the database", () => {
      allCustomers.forEach((customer) => {
        cy.get('tbody').contains('td', customer.id).should('be.visible')
        cy.get('tbody').contains('td', customer.name).should('be.visible')
        cy.get('tbody').contains('td', customer.employees).should('be.visible')
        cy.get('tbody').contains('td', customer.size).should('be.visible')
      })
    })

    it.only('Sorts by Number of employees in ascending order', () => {
      cy.get('th').contains('Number of employees').parent().click()
      cy.get('tbody tr').first().find('td').eq(2).should('contain', '50')
    })

    it('Sorts by Number of employees in descending order', () => {
      cy.get('th').contains('Number of employees').parent().dblclick()
      cy.get('tbody tr').first().find('td').eq(2).should('contain', '5000')
    })

    it('Sorts by Size in ascending order', () => {
      cy.get('th').contains('Size').parent().click()
      cy.get('tbody tr').first().find('td').eq(3).should('contain', 'small')
    })

    it('Sorts by Size in descending order by default', () => {
      cy.get('tbody tr').first().find('td').eq(3).should('contain', 'very large enterprise')
    })

    it('Sorts in descending order by default when changing the sorting column', () => {
      cy.get('th').contains('Number of employees').parent().click()
      cy.get('th').contains('Size').parent().click()
      cy.get('tbody tr').first().find('td').eq(3).should('contain', 'very large enterprise')
    })
  })

  context('Table and App', () => {
    it("Shows a Loading... fallback element before the initial customers' fetch", () => {
      cy.mount(<App />)

      cy.get('#loading').should('be.visible')

      cy.mount(<Table customers={allCustomers} />)

      cy.get('#loading').should('not.exist')
    })
  })
})
