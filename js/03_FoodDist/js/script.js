document.addEventListener("DOMContentLoaded", function () {
  main();
});

const main = () => {
  const items = document.querySelectorAll('.tabheader__item'),
    tabContents = document.querySelectorAll(".tabcontent"),
    itemContainer = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabContents.forEach(tab => {
      tab.classList.add('hide');
      tab.classList.remove('show', 'fade');
    });

    items.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  const showTabContent = (i = 0) => {
    tabContents[i].classList.add('show', 'fade');
    tabContents[i].classList.remove('hide');
    items[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();

  itemContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      items.forEach((item, index) => {
        if (target === item) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}