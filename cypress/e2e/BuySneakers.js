const {
  Given,
  When,
  Then,
  And,
} = require("@badeball/cypress-cucumber-preprocessor");
import { SelectorsForChoiceCloth } from "./data/SelectorsForChoiceCloth";
const selectorsForChoiceCloth = new SelectorsForChoiceCloth();
function choice(n) {
  return Math.round(Math.random(0, n));
}
let childN
beforeEach(() => {
  // run these tests as if in a desktop
  // browser with a 720p monitor
  cy.viewport(1920, 1080);
});
Given("{string} Bob go to shop {string} for {string}", (gender, url, sneakers) => {
  cy.visit(url);
 
  cy.get(selectorsForChoiceCloth.cookies).click();
  if (gender === "Woman") { childN = 1 }
  childN = 2

    cy.get(`:nth-child(${childN}) ${selectorsForChoiceCloth.choiceGender}`).click();
  
  cy.get(`:nth-child(${childN}) ${selectorsForChoiceCloth.choiceCloth}`).click();
  cy.get(selectorsForChoiceCloth.choiceClothType)
    .contains(sneakers)
    .click({ force: true });
});
Given('selection "<param>", "<data>" and "<id>":', (DataTable) => {
  const result = DataTable.hashes();
    for (let element of result) {
    cy.get(selectorsForChoiceCloth.choiceParam)
      .contains(element.param)
      .click({ force: true });
    if (element.param === "Цена") {
      cy.get(`${element.id}`).type(`{selectAll} ${element.data}`, {
        force: true,
      });
    } else {
      cy.contains(`${element.data}`).click({ force: true });
      cy.get(".m-6 > .flex").click({ force: true });
    }
  }
  const namberClothType = cy
    .get(selectorsForChoiceCloth.choiceClothImage)
    .its("length");

  cy.get(selectorsForChoiceCloth.choiceClothImage)
    .eq(choice(namberClothType))
    .click();
});
//const n = element.all(by.name(".Image__cardImage__xvgs1"));
