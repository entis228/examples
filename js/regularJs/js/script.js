"use strict";

const personalMoviesDb = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  privat: false,
  start: function () {
    this.count = this.promptTillValid("How many films did you watch?", "number", false);
  },
  saveFilms: function () {
    for (let i = 0; i < this.count; i++) {
      let filmName = this.promptTillValid(`Film #${i + 1}: One of the last watched films`, "string", false);
      while (filmName.length >= 50) {
        if (filmName.length >= 50) {
          alert("Your answer is more than 50 symbols, please enter another smaller name");
        }
        filmName = this.promptTillValid(`Film #${i + 1}: One of the last watched films`, "string", false);
      }
      this.movies[filmName] = this.promptTillValid(`Film #${i + 1}: Mark (from 1 to 10)`, "number", false);
    }
  },
  promptTillValid: function (question, responseType, isBlank) {
    const checkIfBlank = (value) => {
      return value && value.length === 0;
    }
    if (typeof question !== "string" || checkIfBlank(question)) {
      throw new Error("Question is blank or not a string");
    }
    if (typeof responseType !== "string" || checkIfBlank(question)) {
      throw new Error("Type is blank or not a string");
    }
    if (typeof isBlank !== "boolean") {
      throw new Error("IsBlank is not a boolean");
    }
    while (true) {
      const stringResponse = prompt(question, "");
      if (!isBlank && checkIfBlank(stringResponse)) {
        alert("Prompt value must be not blank");
        continue;
      }
      if (responseType === "number") {
        const numberValue = +stringResponse;
        if (isNaN(numberValue)) {
          alert("Invalid prompt, the value is not a number");
          continue;
        }
        return numberValue;
      } else {
        return stringResponse;
      }
    }
  },
  detectLevel: function () {
    const filmCount = this.count;
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
  },
  showMyDb: function () {
    if (!this.privat) {
      console.log(this);
    }
  },
  writeYourGenres: function () {
    for (let i = 0; i < 3; i++) {
      this.genres[i] = this.promptTillValid(`Your favourite genre #${i + 1}`, "string", true);
    }
    this.genres.forEach((genre, index) => console.log(`Любимый жанр №${index + 1} - это ${genre}`))
  },
  toggleVisibleMyDb: function () {
    this.privat = !this.privat;
  }
};

personalMoviesDb.start();

personalMoviesDb.saveFilms();

personalMoviesDb.detectLevel();

personalMoviesDb.showMyDb();

personalMoviesDb.writeYourGenres();

personalMoviesDb.toggleVisibleMyDb();

personalMoviesDb.showMyDb();