'use strict';

document.addEventListener('DOMContentLoaded', function () {

  const FOIE_GRAS_TYPE = 'с фуа-гра';
  const FISH_TYPE = 'с рыбой';
  const CHICKEN_TYPE = 'с курой';
  const FOIE_GRAS_DESCRIPTION = 'Печень утки разварная с артишоками.';
  const FISH_DESCRIPTION = 'Головы щучьи с чесноком да свежайшая сёмгушка.';
  const CHICKEN_DESCRIPTION = 'Филе из цыплят с трюфелями в бульоне.';
  const DEFAULT_DESCRIPTION = 'Чего сидишь? Порадуй котэ, &nbsp;<a class="page-main__buy-link">купи.</a>';
  const foieGrasItem = document.querySelector('.page-main__item-foie-gras');
  const fishItem = document.querySelector('.page-main__item-fish');
  const chickenItem = document.querySelector('.page-main__item-chicken');
  const foieGrasPackage = foieGrasItem.querySelector('.page-main__package');
  const fishPackage = fishItem.querySelector('.page-main__package');
  const chickenPackage = chickenItem.querySelector('.page-main__package');

  function changePackages (item, itemPackage, packageType, description) {

    const onPackageRemoveSelectionHover = () => {
      itemPackage.classList.remove('page-main__package--select-hover');
    };

    const onPackageAddSelectionHover = () => {
      itemPackage.classList.add('page-main__package--select-hover');
    };

    const onPackageAddSelection = evt => {
      let linkBuy = item.querySelector('.page-main__buy-link');
      if (!itemPackage.classList.contains('page-main__package--selected') && !itemPackage.classList.contains('page-main__package--disabled')) {
        if (itemPackage.contains(evt.target) || linkBuy.contains(evt.target)) {
          itemPackage.classList.add('page-main__package--selected');
          itemPackage.nextElementSibling.innerHTML = description;

          itemPackage.addEventListener('mouseleave', onPackageRemoveSelectionHover);
          itemPackage.addEventListener('mouseenter', onPackageAddSelectionHover);
        }
      }
    };

    const onPackageRemoveSelection = evt => {
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
      itemPackage.nextElementSibling.innerHTML = `Печалька, ${packageType} закончился.`;
      itemPackage.nextElementSibling.style.color = '#ffff66';
    }
  }

  changePackages(foieGrasItem, foieGrasPackage, FOIE_GRAS_TYPE, FOIE_GRAS_DESCRIPTION);
  changePackages(fishItem, fishPackage, FISH_TYPE, FISH_DESCRIPTION);
  changePackages(chickenItem, chickenPackage, CHICKEN_TYPE, CHICKEN_DESCRIPTION);
});
