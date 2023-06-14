export class SelectorsForChoiceCloth {
  // Селектор для соглашаемся с куки
  cookies =
    ".CookiesInfo__cookiesInfoBtnWrapper__3q6Ss > .btn--primary > .flex";
  // Селектор пол
  choiceGender = " > .CategoriesSection__menuLink__CrqSv";
  // Селектор видов одежды (одежда, обувь и т.д.)
  choiceCloth1 = " > .SubcategoriesMenu__subsectionList__dDKxb > :nth-child("; //'li[class="SubcategoriesMenu__subsectionListItem__aEZsz"]';
  // Селектор типов (ботинки, кроссовки и т.д.)
  choiceCloth2 = ") > .SubcategoriesMenu__subsectionListItemLink__UZvxT";
  choiceClothType =
    //"span[class='SubcategoryAccordion__subcategoryAccordionCategoryName__aEo5o']";
    ".SubcategoriesMenu__subsectionMenuFlash__J1gOQ";
  // Селектор контейнера параметров товара
  choiceParam =
    '[class="BaseSelectDropdown__select__Wc73+ BaseSelectDropdown__selectEllipsis__7yf8v Filters__filterItem__IhPPd"]';
  // Селектор фото отобранных товаров
  choiceClothImage = ".ProductItem__productCard__8ivfZ";
  // // Селекторы категории одежды
  confirmSize =
    'i[class="icon Icon__icon-v__OxZwe BaseSelectDropdown__icon__Qzn7j BaseSelectDropdown__iconRotateUp__htHJ9"]';
}
