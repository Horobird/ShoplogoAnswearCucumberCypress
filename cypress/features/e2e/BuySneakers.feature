Feature: Buy Sneakers


  Scenario: Bob select Sneakers
    Given "Man" Bob go to shop 'https://answear.ua/ru' for "Кроссовки"
       And selection "<param>", "<data>" and "<id>":
      | param  | data    | id                        |
      | Цена   | 4000    | #PriceFilterRangeInputMax |
      | Размер |  40     | #baseSearch               |
      | Цвет   | голубой | span[`${element.data}`]   |
  
    When adds it to "basket"
       And go to the "basket"
  
    Then  Bob checks "<param>","<data>" and "<id>"
| param            | data    | id                                                    | teg  | nEq |
# | Товара в корзине | 1       | .CartItem__cartItemRow__jG5Ns                   |      |     |
| Цена   | 4000 | [class^="CartPrice__regular"]                                      | span | 0   |
| Размер | 40   | [class^="CartInfo__value__CpK6x CartInfo__valueTextCenter__zDi4F"] | span | 2   |
| Цвет   | голуб| [class^="CartInfo__value__CpK6x CartInfo__textBold__xUTfb"]        | p    | 1   |
| Кол-во | 1    | [class^='QuantitySelectorTemplate__quantityValue']                 | span | 1   |

# Scenario: Bob buy Sneakers
#   Given Bob go to 'https://answear.ua/ru/checkout?step=1'
#     And selects  method:
#     |  delivery  |    address    |    pay    | total  |
#     |  step=1    |    step=2     |   step=3  | step=4 |
#     |  newMail   |superscription | methodPay | sumPay |
#     |  courier   |superscription | methodPay | sumPay |

#   When Bob checks:
#     |  delivery  |    address    |    pay    | total  |
#     |  mail      |superscription | methodPay | sumPay |
#   Then Bob go to 'https://answear.ua/ru/checkout?step=4'
#     And He checks price of Sneakers
#     And He checks color of Sneakers
#     And He checks size of Sneakers
#     And He checks delivery method
#     And He checks address for delivery
#     And He going to pay