Feature: Buying clothes

Scenario: Bob buys clothes
   Given Bob goes to the store 'https://answear.ua/ru'
      And hi  chooses the language 'UA'
      And he chooses clothes for 'woman'
      And Bob selects goods 'Одяг'
         | param   | data|
         |Новинки  | 1   |
         | Одяг    | 2   |
         | Взуття  | 3   |
         |Аксесуари| 4   |
         
      And he selects shoe for 'Нижня білизна'
      And Bob chooses clothing options
      | param  | data    | id                        |
      | Ціна   | 4000    | #PriceFilterRangeInputMax |
      | Розмір |  S      | #baseSearch               |
      | Колір  | чорний  | span[`${element.data}`] |
      And Bob chooses one of his favorites
      And hi in the selected confirms the option "Вибрати розмір"
   When adds it to basket
      And go to the basket
  
   Then  Bob checks the parameters of the selected clothes in the basket
| param            | data    | id                                                              | 
| Ціна             |  4000   | [class^="CartPrice__regular"]                                   |
| Розмір           |  S      | [class^="CartInfo__value__CpK6x CartInfo__valueTextCenter__zDi4F"] |
| Колір            | чорн    | [class^="CartInfo__value__CpK6x CartInfo__textBold__xUTfb"]      |
| Кількість        |         | [class^='QuantitySelectorTemplate__quantityValue'] |

