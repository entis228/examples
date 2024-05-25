document.addEventListener("DOMContentLoaded", function () {
  tabs();
  timer();
  modal();
});

const tabs = () => {
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

const timer = () => {
  const deadline = new Date(new Date().getTime()+9999999).toISOString();
  let intervalId = setInterval(updateTimer, 1000);
  updateTimer();

  function updateTimer() {
    const getTimeFromDeadline = (deadline) => {
      let millis = new Date(deadline).getTime() - new Date().getTime();
      let days = 0, hours = 0, minutes = 0, seconds = 0;
      if (millis > 0) {
        days = Math.floor(millis / (1000 * 60 * 60 * 24));
        hours = Math.floor((millis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((millis % (1000 * 60)) / 1000);
      }

      return {
        millis,
        days,
        hours,
        minutes,
        seconds
      }
    }

    const updateSelector = (timeValues) => {
      const addZeroIfNeeded = (value) => {
        let stringValue = value.toString();
        if (stringValue.length < 2) {
          return '0' + stringValue;
        }
        return stringValue;
      }

      const timer = document.querySelector(".timer"),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds");

      days.textContent = addZeroIfNeeded(timeValues.days);
      hours.textContent = addZeroIfNeeded(timeValues.hours);
      minutes.textContent = addZeroIfNeeded(timeValues.minutes);
      seconds.textContent = addZeroIfNeeded(timeValues.seconds);
    }

    const t = getTimeFromDeadline(deadline);
    if (t.millis <= 0) {
      clearInterval(intervalId);
    }
    updateSelector(t);
  }
}

const modal = ()=>{
  const openModalButtons = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal'),
    closeButton = modalWindow.querySelector('[data-close]');

  openModalButtons.forEach(button => button.addEventListener('click', (event) => {
    event.preventDefault();
    openModalWindow();
  }));

  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    closeModalWindow();
  });

  modalWindow.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target === modalWindow) {
      closeModalWindow();
    }
  });

  document.addEventListener('keydown', event => {
    if(event.code === 'Escape' && modalWindow.classList.contains('show')) {
      closeModalWindow();
    }
  });

  const closeModalWindow = ()=>{
    modalWindow.classList.toggle('show');
    document.body.style.overflow = '';
  }

  const openModalWindow = () =>{
    modalWindow.classList.toggle('show');
    document.body.style.overflow = 'hidden';
  }

  const onScroll = () => {
    if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
      openModalWindow();
      window.removeEventListener('scroll', onScroll);
    }
  }

  setTimeout(openModalWindow, 3000);

  window.addEventListener('scroll', onScroll);
}