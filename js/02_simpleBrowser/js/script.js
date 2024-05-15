'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};
const removeAdds = () => {
    const adds = document.querySelectorAll('.promo__adv img');
    adds.forEach(add => {
        add.remove();
    });
}
const renameGenre = () => {
    const genre = document.querySelector('.promo__genre');
    genre.textContent = 'драма';
}
const changeBackground = () => {
    const background = document.querySelector('.promo__bg');
    background.style.backgroundImage = "url('img/bg.jpg')";
}
const showFilms = () => {
    const list = document.querySelector('.promo__interactive-list');
    list.innerHTML = '';
    movieDB.movies.sort();
    movieDB.movies.forEach((movieName, index) => {
        list.innerHTML += `<li class="promo__interactive-item">${index + 1 + ' ' + movieName}
                            <div class="delete"></div>
                           </li>`
    });
}
const addCreateFilmEvent = () => {
    const button = document.querySelector('.promo__interactive .add button');
    const textField = document.querySelector('.promo__interactive .add input[type="text"]');
    button.addEventListener('click', (event) => {
        event.preventDefault();
        let filmName = textField.value;
        if (filmName.length > 21) {
            filmName = filmName.slice(0, 21) + "...";
        }
        const checkbox = document.getElementById('favouriteCheckbox');
        if (checkbox.checked) {
            console.log("Добавляем любимый фильм");
        }
        movieDB.movies.push(filmName);
        showFilms();
        addDeleteFilmEvent();
    });
}
const addDeleteFilmEvent = () => {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            const listItem = deleteButton.parentElement;
            const dbValues = movieDB.movies;
            const listItemIndex = listItem.textContent.slice(0, listItem.textContent.indexOf(' '));
            dbValues.splice(listItemIndex - 1, 1);
            showFilms();
            addDeleteFilmEvent();
        })
    });
}

document.addEventListener('DOMContentLoaded', () => {
    removeAdds();
    renameGenre();
    changeBackground();
    showFilms();
    addCreateFilmEvent();
    addDeleteFilmEvent();
});