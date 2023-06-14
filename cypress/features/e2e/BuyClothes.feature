Feature: Buying clothes

Scenario: Bob buys clothes
   Given Bob goes to the store 'https://answear.ua/ru'
      And hi  chooses the language 'UA'
      And he chooses clothes for 'man'
      And Bob selects goods 'Взуття'
         | param   | data|
         |Новинки  | 1   |
         | Одяг    | 2   |
         | Взуття  | 3   |
         |Аксесуари| 4   |
         
      And he selects shoe for 'Кросівки'
      And Bob chooses clothing options
      | param  | data    | id                        |
      | Ціна   | 4000   | #PriceFilterRangeInputMax |
      | Розмір | 40      | #baseSearch               |
      | Колір  | блакитний | span[`${element.data}`] |
      And Bob chooses one of his favorites
      And hi in the selected confirms the option "Вибрати розмір"
   When adds it to basket
      And go to the basket
  
   Then  Bob checks the parameters of the selected clothes in the basket
| param            | data    | id                                                              | 
| Ціна             | 4000    | [class^="CartPrice__regular"]                                   |
| Розмір           | 40      | [class^="CartInfo__value__CpK6x CartInfo__valueTextCenter__zDi4F"] |
| Колір            |блакит   | [class^="CartInfo__value__CpK6x CartInfo__textBold__xUTfb"]      |
| Кількість        |   1     | [class^='QuantitySelectorTemplate__quantityValue'] |

