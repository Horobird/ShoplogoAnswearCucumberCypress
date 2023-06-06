Feature: Buy Sneakers


  # Background:
  #   Given Bobs dream is new Sneakers.
  #     And Bobs has 3500 UA
  #     And The favorite Bobs color is blue
  #     And Bob's foot size 42
  # /k/vin/vzuttya/krosivky
  Scenario: Bob select Sneakers
    Given "Man" Bob go to shop 'https://answear.ua/ru' for "Кроссовки"
    And selection "<param>", "<data>" and "<id>":
      | param  | data    | id                        |
      | Цена   | 4000    | #PriceFilterRangeInputMax |
      | Размер |  42     | #baseSearch               |
      | Цвет   | чёрный | span[`${element.data}`]   |
# When  Bob selects Sneakers and go to bascet 'https://answear.ua/ru/cart'
#   # And He selects size for Sneakers
#   # And He selects color for Sneakers
# Then  Bob checks
# | Цена  | Размер  | Цвет |
# | <=3500 | 42     |  blue |

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