const {
  Given,
  When,
  Then,
  DataTable,
} = require("@badeball/cypress-cucumber-preprocessor");
import { SelectorsForChoiceCloth } from "./data/SelectorsForChoiceCloth";
const selectorsForChoiceCloth = new SelectorsForChoiceCloth();
let min = 1;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min - 1; //Максимум и минимум включаются
}
let size;
let childN;
let nExpect;
let nActual;
beforeEach(() => {
  // run these tests as if in a desktop browser with a 1920p monitor
  cy.viewport(1920, 1080);
});
Given(
  "{string} Bob go to shop {string} for {string}",
  (gender, url, sneakers) => {
    cy.visit(url);
    // Соглашаемся с куки
    cy.get(selectorsForChoiceCloth.cookies).click();
    // Определяем пол
    if (gender === "Woman") {
      childN = 1;
    }
    childN = 2;
    cy.get(`:nth-child(${childN}) ${selectorsForChoiceCloth.choiceGender}`)
      .should("be.visible")
      .click();
    // выбираем вид одежды (одежда, обувь и т.д.)
    cy.get(`:nth-child(${childN}) ${selectorsForChoiceCloth.choiceCloth}`)
      .should("be.visible")
      .trigger("mouseover");
    // выбираем тип (ботинки, кроссовки и т.д.)
    cy.get(selectorsForChoiceCloth.choiceClothType)
      .contains(sneakers)
      .should("be.visible")
      .click();
  }
);
Given('selection "<param>", "<data>" and "<id>":', (DataTable) => {
  const result = DataTable.hashes();
  // Делаем отбор по параметрам (цена, размер и т.д.)
  for (let el of result) {
    cy.get(selectorsForChoiceCloth.choiceParam)
      .contains(el.param)
      .should("be.visible")
      .click({ force: true })
      .then(() => {
        if (el.param === "Цена") {
          cy.get(`${el.id}`)
            .should("be.visible")
            .type(`{selectAll} ${el.data}`, {
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
      // break;
    }
  }
  cy.get(selectorsForChoiceCloth.choiceClothImage).then((namberClothType) => {
    namberClothType = Cypress.$(
      selectorsForChoiceCloth.choiceClothImage
    ).length;
    cy.log("namberClothType", namberClothType);
    // Рандомно выбираем один экземпляр для покупки
    cy.get(selectorsForChoiceCloth.choiceClothImage)
      .eq(getRandomInt(min, namberClothType))
      .should("be.visible")
      .click();
  });
  // Еще раз выбираем размер
  cy.scrollTo(500, 0);
  cy.contains("Выбрать размер").click({ force: true });
  cy.get(".BaseSelectItem__selectItemLabel__usttW").contains(size).click();
});
When("adds it to {string}", function (basket) {
  cy.get(
    ".ProductActive__cartConfirmationAddToCartWrapper__LIIqK > .btn"
  ).click({ force: true });
});
When('go to the "basket"', function (basket) {
  cy.get(".RoundBadge__badge__ynfzx").click();
});
Then(
  "Bob checks {string},{string} and {string}",
  (param, data, id, DataTable) => {
    const result = DataTable.hashes();
    cy //.get(".CartItem__sectionContainer__g7Oaw")
      //.eq(1)
      .get(".CartItem__sectionWrapper__VNeYo")
      .then((selectors) => {
        selectors = Cypress.$(".CartItem__sectionWrapper__VNeYo").length;
        cy.log(selectors);
        for (let k = 0; k < selectors; k++) {
          cy.log("k=", k);
          for (let el of result) {
            for (let nP = 0; nP < 2; nP++) {
              cy.log("np=",`${k} ${nP}`);
              cy.get(".CartItem__sectionWrapper__VNeYo")
                .eq(k)
                .find("p")
                .eq(nP)
                .then(($div) => {
                  nExpect = $div.text();
                  cy.log('ожидаем', nExpect);
                  cy.log('сверяем с', el.param);
                  if (el.param === nExpect) {
                    let teg = "span";
                    // if (nExpect === "Цвет") {
                    //   teg = "p";
                    // }
                    cy.get(el.id)
                      .eq(k)
                      .find(el.teg)
                      .eq(el.nEq)
                      // .within((el) => {
                      //   cy.get({teg}.first());
                      // })
                      //.eq(nP)
                      .should(($div) => {
                        if (el.param === "Цвет") {
                           
                           nExpect = $div.text()
                           nActual = el.data ;
                           expect(nExpect).to.have.string(nActual);
                         } else {
                           nExpect = parseFloat($div.text());
                           nActual = parseFloat(el.data);
                           expect(nExpect).to.be.lte(nActual);
                         }

                        
                        
                      });
                  }
                });
            }
          }
        }
      });
    //    for (let el of result) {
    // if (el.param === "Товара в корзине") {
    //   cy.get(el.id).then((namberClothType) => {
    //     namberClothType = Cypress.$(el.id).length;
    //     assert.strictEqual(`${namberClothType}`, el.data);
    //   });
    // } else {
    //   if (el.param === "Цена") {
    //     cy.get(el.id)
    //       .eq("0")
    //       .should(($div) => {
    //         const nExpect = parseFloat($div.text());
    //         const nActual = parseFloat(el.data) ;
    //         expect(nExpect).to.be.lte(nActual);
    //       });
    //   } else {
    //     cy.get(el.id).eq("1").should(($div) => {
    //       const nExpect = parseFloat($div.text());
    //       const nActual = parseFloat(el.data) ;
    //       expect(nExpect).to.be.lte(nActual);
    // } );
    //      }
    //   }

    // }
  }
);
//("chooses again {string}", function (size) {

//Given('chooses again "string"', (size) => {

// });
// When("Bob selects Sneakers and go to basket {string}", (urlBasket) => {

// })
//const n = element.all(by.name(".Image__cardImage__xvgs1"));
