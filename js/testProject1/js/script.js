"use strict";

const numberOfFilms = prompt("How many films did you watch?", "");

const personalMoviesDb = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false
};

personalMoviesDb.movies[prompt("One of the last watched films", "")] = prompt("Mark (from 1 to 10)", "");
personalMoviesDb.movies[prompt("One of the last watched films", "")] = prompt("Mark (from 1 to 10)", "");

console.log(personalMoviesDb);