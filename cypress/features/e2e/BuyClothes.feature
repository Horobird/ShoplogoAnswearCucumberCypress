Feature: Buying clothes

  Scenario: Bob buys clothes
    Given Bob goes to the store 'https://answear.ua/ru'
       And he chooses clothes for 'men'
       And Bob selects goods 'shoes'
       And he selects shoe for 'Кроссовки'
       And Bob chooses clothing options
      | param  | data    | id                        |
      | Цена   | 4000    | #PriceFilterRangeInputMax |
      | Размер |  40     | #baseSearch               |
      | Цвет   | голубой | span[`${element.data}`]   |
       And Bob chooses one of his favorites
       And hi in the selected confirms the option "Выбрать размер"
    When adds it to "basket"
       And go to the "basket"
  
    Then  Bob checks the parameters of the selected clothes in the basket
| param            | data    | id                                                                 | teg  | nEq | 
| Цена             | 4000    | [class^="CartPrice__regular"]                                      | span | 0   |
| Размер           | 40      | [class^="CartInfo__value__CpK6x CartInfo__valueTextCenter__zDi4F"] | span | 2   |
| Цвет             | голуб   | [class^="CartInfo__value__CpK6x CartInfo__textBold__xUTfb"]        | p    | 1   |
| Кол-во           | 1       | [class^='QuantitySelectorTemplate__quantityValue']                 | span | 1   |

