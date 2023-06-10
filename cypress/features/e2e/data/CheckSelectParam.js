import { DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { result } from "cypress/types/lodash";

cy.get(".CartItem__sectionContainer__g7Oaw")
  .eq(1)
    .then(() => {
        const selectors = Cypress.$(".CartItem__sectionWrapper__VNeYo").length;
        let n=-1
        for (let sel of selectors) {
             n+=1;
            for (let el of result) {
                for (let nP = 0; 1; nP++) {
                    cy.get(".CartItem__sectionWrapper__VNeYo").eq(n).find('p').get(nP).should(($div) => {
                        const nExpect = ($div.text());
                        if (el.param === nExpect) {
               
                            cy.get(".CartItem__sectionWrapper__VNeYo").eq(n).find('p').get(nP).should(($div) => {
                               const nExpect = parseFloat($div.text());
                               const nActual = parseFloat(el.data);
                               expect(nExpect).to.be.lte(nActual);
                            }
                    )}
                    })
        } ;
               
            }
        }
  });