document.addEventListener("DOMContentLoaded", function () {
    tabs();
    timer();
    modal();
    menus();
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
    const deadline = new Date(new Date().getTime() + 9999999).toISOString();
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

const modal = () => {
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
        if (event.target === modalWindow) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    });

    const closeModalWindow = () => {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = '';
    }

    const openModalWindow = () => {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }

    const onScroll = () => {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModalWindow();
            window.removeEventListener('scroll', onScroll);
        }
    }

    setTimeout(openModalWindow, 3000);

    window.addEventListener('scroll', onScroll);

    const thanksModal = (message) => {
        if (!modalWindow.classList.contains('show')) {
            openModalWindow();
        }
        const dialog = document.querySelector('.modal__dialog');
        const content = dialog.querySelector('.modal__content');
        content.classList.add('hide');
        const newContent = document.createElement('div');
        newContent.classList.add('modal__content');
        newContent.innerHTML = `<div data-close class="modal__close">&times;</div>
                            <div class="modal__title">${message}</div>`;
        dialog.append(newContent);
        setTimeout(() => {
            newContent.remove();
            content.classList.remove('hide');
            closeModalWindow();
        }, 2000);
    }

    const processForms = () => {
        const forms = document.querySelectorAll('form');

        const messages = {
            loading: "img/spinner/spinner.svg",
            ok: "Запрос был удачно отправлен.",
            error: "Произошла ошибка."
        }

        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const form = event.target;
                const spinner = document.createElement("img");
                spinner.classList.add('spinner');
                spinner.setAttribute('src', messages.loading);
                spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
                form.insertAdjacentElement('afterend', spinner);

                // FETCH
                const formData = new FormData(form);
                const body = {};
                formData.forEach((value, key) => {
                    body[key] = value;
                });
                fetch("http://localhost:8080/json", {
                    mode: "no-cors",
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    return response.json()
                }).then(response => {
                    console.log(response);
                    thanksModal(messages.ok);
                }).catch(() => {
                    thanksModal(messages.error);
                }).finally(() => {
                    spinner.remove();
                    form.reset();
                });

                // XML HTTP request
                // const sendAsMultipart = (form) => {
                //     const request = new XMLHttpRequest();
                //     request.open('POST', 'http://localhost:8080/multipartData');
                //     const formData = new FormData(form);
                //     request.send(formData);
                //
                //     return request;
                // }

                // const sendAsJson = (form) => {
                //     const request = new XMLHttpRequest();
                //     request.open('POST', 'http://localhost:8080/json');
                //     request.setRequestHeader("content-type", "application/json");
                //     const formData = new FormData(form);
                //     const body = {};
                //     formData.forEach((value, key) => {
                //         body[key] = value;
                //     });
                //     request.send(JSON.stringify(body));
                //     return request;
                // }

                // const request = sendAsMultipart(form);
                // const request = sendAsJson(form);

                // request.addEventListener("load", () => {
                //     spinner.remove();
                //     if (request.status === 200) {
                //         console.log(request.response);
                //         thanksModal(messages.ok);
                //         form.reset();
                //         setTimeout(() => spinner.remove(), 2000);
                //     } else {
                //         thanksModal(messages.error);
                //     }
                // })
            });
        });
    }

    processForms();
}

const menus = () => {
    class MenuItem {
        constructor(imageSrc, alt, title, description, price) {

            this.imageSrc = imageSrc;
            this.title = title;
            this.description = description;
            this.price = price;
            this.alt = alt;
        }

        render(container) {
            const element = document.createElement('div');

            element.innerHTML +=
                `<div class="menu__item">
                    <img src="${this.imageSrc}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total">
                            <span>${this.price}</span> грн/день
                        </div>
                    </div>
                </div>`;
            container.append(element);
        }
    }

    const itemContainer = document.querySelector('.menu .menu__field .container');
    itemContainer.innerHTML = '';
    const items = [
        new MenuItem("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', "229"),
        new MenuItem("img/tabs/elite.jpg", "elite", 'Меню "Премиум"', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', "550"),
        new MenuItem("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', "430"),
        new MenuItem("img/tabs/masterchef.jpg", "super", 'Меню "Мастершеф"', "Блюда высокой кухни", "700")
    ];
    items.forEach(item => {
        item.render(itemContainer);
    });
}