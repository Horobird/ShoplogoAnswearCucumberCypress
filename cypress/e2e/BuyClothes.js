const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
import { SelectorsForChoiceCloth } from "./data/SelectorsForChoiceCloth";
const selectorsForChoiceCloth = new SelectorsForChoiceCloth();
//  Функція рандомного вибору
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min - 1;
}
let size;
let childN;
let namberTavar;
beforeEach(() => {
  // run these tests as if in a desktop browser with a 1920p monitor
  cy.viewport(1920, 1080);
});
Given("Bob goes to the store {string}", (url) => {
  cy.visit(url);
  cy.log("Погоджуємося з куки");
  cy.get(selectorsForChoiceCloth.cookies).click();
});
Given("hi  chooses the language {string}", (language) => {
  cy.get(".Header__langChangeDesktop__k9CN8")
    .contains(language)
    .should("be.visible")
    .click();
});
Given("he chooses clothes for {string}", (gender) => {
  cy.log('Вибираємо стать "Він" ("Вона") та перевіряємо цю кнопку');
  if (gender === "woman") {
    childN = 1;
  } else {
    childN = 2;
  }
  cy.get(`:nth-child(${childN}) ${selectorsForChoiceCloth.choiceGender}`)
    .should("be.visible")
    .click();
});
Given("Bob selects goods {string}", (tavarType, DataTable) => {
  const result = DataTable.hashes();
  cy.log(result.param);
  cy.log("Вибираємо вид одягу (одяг, взуття тощо)");
  for (let el of result) {
    if (el.param === tavarType) {
      namberTavar = el.data;
    }
  }
  cy.get(
    `:nth-child(${childN}) ${selectorsForChoiceCloth.choiceCloth1}${namberTavar}${selectorsForChoiceCloth.choiceCloth2}`
  )
    .contains(tavarType)
    .should("be.visible")
    .trigger("mouseover");
});
Given("he selects shoe for {string}", (sneakers) => {
  cy.log("Вибираємо тип (черевики, кросівки тощо)");
  cy.get(selectorsForChoiceCloth.choiceClothType)
    .contains(sneakers)
    .should("be.visible")
    .click();
});
Given("Bob chooses clothing options", (DataTable) => {
  const result = DataTable.hashes();
  cy.log("Робимо відбір за параметрами (ціна, розмір тощо)");
  for (let el of result) {
    cy.log("Вибираємо", el.param);
    cy.get(selectorsForChoiceCloth.choiceParam)
      .contains(el.param)
      .should("be.visible")
      .click({ force: true })
      .then(() => {
        if (el.param === "Ціна") {
          cy.get(el.id).should("be.visible").type(`{selectAll} ${el.data}`, {
            force: true,
          });
        } else {
          cy.contains(`${el.data}`).click({ force: true });
        }
      });
    cy.get(".m-6 > .flex").should("be.visible").click({ force: true });
    if (el.param === "Розмір") {
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
    cy.log("Рандомно вибираємо один екземпляр для покупки");
    cy.get(selectorsForChoiceCloth.choiceClothImage)
      .eq(getRandomInt(1, namberClothType))
      .should("be.visible")
      .click();
  });
});
Given("hi in the selected confirms the option {string}", (option) => {
  cy.log("Ще раз вибираємо (підтверджуємо) розмір");
  cy.scrollTo(500, 0);
  cy.get(selectorsForChoiceCloth.confirmSize)
    // .contains(option)
    .should("be.visible")
    .click({ force: true });
  cy.get(selectorsForChoiceCloth.sizeClick)
    .contains(size)
    .should("be.visible")
    .click();
});
When("adds it to basket", function () {
  cy.get(selectorsForChoiceCloth.addToBasket)
    .should("be.visible")
    .click({ force: true });
});
When("go to the basket", function () {
  cy.get(selectorsForChoiceCloth.enterToBasket).should("be.visible").click();
});
Then(
  "Bob checks the parameters of the selected clothes in the basket",
  (DataTable) => {
    const result = DataTable.hashes();
    cy.get(selectorsForChoiceCloth.paramsInBasket).then((selectors) => {
      selectors = Cypress.$(".CartItem__sectionWrapper__VNeYo").length;
      for (let el of result) {
        cy.log("Перевірка", el.param);
        cy.get(selectorsForChoiceCloth.paramsInBasket)
          .contains(el.param)
          .should("be.visible")
          .get(el.id)
          .then(($div) => {
            if (el.param === "Ціна") {
              expect(parseFloat($div.text())).to.be.lte(parseFloat(el.data));
            } else {
              expect($div.text()).to.have.string(el.data);
            }
          });
      }
    });
  }
);
