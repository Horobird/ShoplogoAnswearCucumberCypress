const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
import { SelectorsForChoiceCloth } from "./data/SelectorsForChoiceCloth";
const selectorsForChoiceCloth = new SelectorsForChoiceCloth();
let min = 1;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min - 1;
}
let size;
let childN;
beforeEach(() => {
  // run these tests as if in a desktop browser with a 1920p monitor
  cy.viewport(1920, 1080);
});
Given("Bob goes to the store {string}", (url, sneakers) => {
  cy.visit(url);
  cy.log("Соглашаемся с куки");
  cy.get(selectorsForChoiceCloth.cookies).click();
});
Given("he chooses clothes for {string}", (gender) => {
  //cy.log('Выбираем пол и проверяем кнопку "Он" ("Она")');
  if (gender === "woman") {
    childN = 1;
  } else {
    childN = 2;
  }
  cy.get(`:nth-child(${childN}) ${selectorsForChoiceCloth.choiceGender}`)
    .should("be.visible")
    .click();
});
Given("Bob selects goods {string}", (shoes) => {
  //cy.log("выбираем вид одежды (одежда, обувь и т.д.)");
  cy.get(`:nth-child(${childN}) ${selectorsForChoiceCloth.choiceCloth}`)
    .should("be.visible")
    .trigger("mouseover");
});
Given("he selects shoe for {string}", (sneakers) => {
  cy.log("выбираем тип (ботинки, кроссовки и т.д.)");
  cy.get(selectorsForChoiceCloth.choiceClothType)
    .contains(sneakers)
    .should("be.visible")
    .click();
});
Given("Bob chooses clothing options", (DataTable) => {
  const result = DataTable.hashes();
  cy.log("Делаем отбор по параметрам (цена, размер и т.д.)");
  for (let el of result) {
    cy.log("выбираем", el.param);
    cy.get(selectorsForChoiceCloth.choiceParam)
      .contains(el.param)
      .should("be.visible")
      .click({ force: true })
      .then(() => {
        if (el.param === "Цена") {
          cy.get(el.id).should("be.visible").type(`{selectAll} ${el.data}`, {
            force: true,
          });
        } else {
          cy.contains(`${el.data}`).click({ force: true });
        }
      });
    cy.get(".m-6 > .flex").should("be.visible").click({ force: true });
    if (el.param === "Размер") {
      size = el.data;
      cy.log("size=", size);
    }
  }
});
Given("Bob chooses one of his favorites", () => {
  cy.get(selectorsForChoiceCloth.choiceClothImage).then((namberClothType) => {
    namberClothType = Cypress.$(
      selectorsForChoiceCloth.choiceClothImage
    ).length;
    cy.log("Рандомно выбираем один экземпляр для покупки");
    cy.get(selectorsForChoiceCloth.choiceClothImage)
      .eq(getRandomInt(min, namberClothType))
      .should("be.visible")
      .click();
  });
});
Given("hi in the selected confirms the option {string}", (option) => {
  cy.log("Еще раз выбираем (подтверждаем) размер");
  // cy.scrollTo(500, 0);
  cy.contains(option).should("be.visible").click({ force: true });
  cy.get(".BaseSelectItem__selectItemLabel__usttW")
    .contains(size)
    .should("be.visible")
    .click();
});
When("adds it to {string}", function (basket) {
  cy.get(".ProductActive__cartConfirmationAddToCartWrapper__LIIqK > .btn")
    .should("be.visible")
    .click({ force: true });
});
When('go to the "basket"', function (basket) {
  cy.get(".RoundBadge__badge__ynfzx").should("be.visible").click();
});
Then(
  "Bob checks the parameters of the selected clothes in the basket",
  (DataTable) => {
    const result = DataTable.hashes();
    cy.get(".CartItem__sectionWrapper__VNeYo").then((selectors) => {
      selectors = Cypress.$(".CartItem__sectionWrapper__VNeYo").length;
      for (let el of result) {
        cy.log("Проверка", el.param);
        cy.get(".CartItem__sectionWrapper__VNeYo")
          .contains(el.param)
          .should("be.visible")
          .get(el.id)
          .then(($div) => {
            if (el.param === "Цена") {
              expect(parseFloat($div.text())).to.be.lte(parseFloat(el.data));
            } else {
              expect($div.text()).to.have.string(el.data);
            }
          });
      }
    });
  }
);
