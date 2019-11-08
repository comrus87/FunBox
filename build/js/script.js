'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var FOIE_GRAS_TYPE = 'с фуа-гра';
  var FISH_TYPE = 'с рыбой';
  var CHICKEN_TYPE = 'с курой';
  var FOIE_GRAS_DESCRIPTION = 'Печень утки разварная с артишоками.';
  var FISH_DESCRIPTION = 'Головы щучьи с чесноком да свежайшая сёмгушка.';
  var CHICKEN_DESCRIPTION = 'Филе из цыплят с трюфелями в бульоне.';
  var DEFAULT_DESCRIPTION = 'Чего сидишь? Порадуй котэ, &nbsp;<a class="page-main__buy-link">купи.</a>';
  var foieGrasItem = document.querySelector('.page-main__item-foie-gras');
  var fishItem = document.querySelector('.page-main__item-fish');
  var chickenItem = document.querySelector('.page-main__item-chicken');
  var foieGrasPackage = foieGrasItem.querySelector('.page-main__package');
  var fishPackage = fishItem.querySelector('.page-main__package');
  var chickenPackage = chickenItem.querySelector('.page-main__package');

  function changePackages(item, itemPackage, packageType, description) {
    var onPackageRemoveSelectionHover = function onPackageRemoveSelectionHover() {
      itemPackage.classList.remove('page-main__package--select-hover');
    };

    var onPackageAddSelectionHover = function onPackageAddSelectionHover() {
      itemPackage.classList.add('page-main__package--select-hover');
    };

    var onPackageAddSelection = function onPackageAddSelection(evt) {
      var linkBuy = item.querySelector('.page-main__buy-link');

      if (!itemPackage.classList.contains('page-main__package--selected') && !itemPackage.classList.contains('page-main__package--disabled')) {
        if (itemPackage.contains(evt.target) || linkBuy.contains(evt.target)) {
          itemPackage.classList.add('page-main__package--selected');
          itemPackage.nextElementSibling.innerHTML = description;
          itemPackage.addEventListener('mouseleave', onPackageRemoveSelectionHover);
          itemPackage.addEventListener('mouseenter', onPackageAddSelectionHover);
        }
      }
    };

    var onPackageRemoveSelection = function onPackageRemoveSelection(evt) {
      if (itemPackage.contains(evt.target)) {
        itemPackage.classList.remove('page-main__package--selected');
        itemPackage.removeEventListener('mouseleave', onPackageRemoveSelectionHover);
        itemPackage.removeEventListener('mouseenter', onPackageAddSelectionHover);
        itemPackage.classList.remove('page-main__package--select-hover');

        if (!itemPackage.classList.contains('page-main__package--disabled')) {
          itemPackage.nextElementSibling.innerHTML = DEFAULT_DESCRIPTION;
        }
      }
    };

    item.addEventListener('click', onPackageAddSelection);
    item.addEventListener('dblclick', onPackageRemoveSelection);

    if (itemPackage.classList.contains('page-main__package--disabled')) {
      itemPackage.nextElementSibling.innerHTML = "\u041F\u0435\u0447\u0430\u043B\u044C\u043A\u0430, ".concat(packageType, " \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0441\u044F.");
      itemPackage.nextElementSibling.style.color = '#ffff66';
    }
  }

  changePackages(foieGrasItem, foieGrasPackage, FOIE_GRAS_TYPE, FOIE_GRAS_DESCRIPTION);
  changePackages(fishItem, fishPackage, FISH_TYPE, FISH_DESCRIPTION);
  changePackages(chickenItem, chickenPackage, CHICKEN_TYPE, CHICKEN_DESCRIPTION);
});