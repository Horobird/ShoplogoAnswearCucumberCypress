import { should } from "chai"

cy.get('.CartItem__sectionWrapper__VNeYo').contains(el.param)
    .should('be.visible')
    .get(el.id).then(($div) => {
        if (el.param === "Цвет") {
          nExpect = $div.text();
          nActual = el.data;
          expect(nExpect).to.have.string(nActual);
        } else {
          nExpect = parseFloat($div.text());
          nActual = parseFloat(el.data);
          expect(nExpect).to.be.lte(nActual);
        }
    })