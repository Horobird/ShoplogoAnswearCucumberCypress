export class SelectorsForChoiceCloth {
  // Селектор для погоджуємося з куки
  cookies =
    ".CookiesInfo__cookiesInfoBtnWrapper__3q6Ss > .btn--primary > .flex";
  // Селектор стать
  choiceGender = " > .CategoriesSection__menuLink__CrqSv";
  // Селектори видів одягу (одяг, взуття та ін.)
  choiceCloth1 = " > .SubcategoriesMenu__subsectionList__dDKxb > :nth-child("; //'li[class="SubcategoriesMenu__subsectionListItem__aEZsz"]';
  choiceCloth2 = ") > .SubcategoriesMenu__subsectionListItemLink__UZvxT";
  // Селекторні види (наприклад: взуття - кросівки тощо)
  choiceClothType =
    //"span[class='SubcategoryAccordion__subcategoryAccordionCategoryName__aEo5o']";
    ".SubcategoriesMenu__subsectionMenuFlash__J1gOQ";
  // Параметри продукту селектора контейнера Ціна, Розмір ...
  choiceParam =
    '[class="BaseSelectDropdown__select__Wc73+ BaseSelectDropdown__selectEllipsis__7yf8v Filters__filterItem__IhPPd"]';
  //Селектор фото обраних товарів
  choiceClothImage = ".ProductItem__productCard__8ivfZ";
  // Селектор для підтвердження розміру
  confirmSize =
    'i[class="icon Icon__icon-v__OxZwe BaseSelectDropdown__icon__Qzn7j BaseSelectDropdown__iconRotateUp__htHJ9"]';
  // Селектор Click для підтвердження розміру
  sizeClick = ".BaseSelectItem__selectItemLabel__usttW";
  // Селектор для додання в кошик
  addToBasket =
    ".ProductActive__cartConfirmationAddToCartWrapper__LIIqK > .btn";
  // Селектор для вхіда в кошик
  enterToBasket = ".RoundBadge__badge__ynfzx";
  //Селектор контейнера перевірки параметров у кошику
  paramsInBasket = ".CartItem__sectionWrapper__VNeYo";
  
}
