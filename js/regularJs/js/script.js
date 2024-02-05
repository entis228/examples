"use strict";

const validatePrompt = (prompt) => {
  if (prompt) {
    if (typeof (prompt) === "string") {
      if (prompt.length < 50) {
        return true;
      } else {
        alert("Your answer is more than 50 symbols, please enter another smaller name");
      }
    }
    if (typeof (prompt) === "number") {
      return true;
    }
  } else {
    alert("Your answer is blank or invalid")
  }
  return false;
}

const numberOfFilms = prompt("How many films did you watch?", "");

const personalMoviesDb = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false
};

for (let i = 0; i < 2; i++) {
  let filmName;
  let filmRate;
  while (true) {
    filmName = prompt(`Film #${i + 1}: One of the last watched films`, "");
    if (!validatePrompt(filmName)) {
      continue;
    }
    filmRate = +prompt(`Film #${i + 1}: Mark (from 1 to 10)`, "");
    if (!validatePrompt(filmRate)) {
      continue;
    }
    break;
  }

  personalMoviesDb.movies[filmName] = filmRate;
}

const filmCount = personalMoviesDb.count;
if (filmCount >= 0 && filmCount < 10) {
  alert("Not so many films are watched");
} else {
  if (filmCount >= 10 && filmCount < 30) {
    alert("You are a nice movie buff");
  } else {
    if (filmCount >= 30) {
      alert("You very like to watch movies, you spent plenty of time on it");
    } else {
      alert("Error in film count");
    }
  }
}


console.log(personalMoviesDb);

