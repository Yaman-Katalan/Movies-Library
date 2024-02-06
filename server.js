"use strict";
// require express
const express = require("express");
// invoke express
const app = express();
// require dotenv
require("dotenv").config();
// require axios
const axios = require("axios");
// require cors
const cors = require("cors");
app.use(cors());
// port
const port = process.env.PORT; // sensitive data
// API KEYS
const apiKey = process.env.API_KEY; // sensitive data
const apiKey2 = process.env.API_KEY2; // sensitive data
// =-=-=-=-=-

// Routs
app.get("/trending", trendingHandler);
app.get("/search", searchHandler);
// =-=-=-=-=-
// Handler Functions

function trendingHandler(req, res) {
  let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
  axios
    .get(url)
    .then((result) => {
      console.log(result.data.results);
      //
      let movieData = result.data.results.map(function (ele) {
        return new Movie(
          ele.id,
          ele.title,
          ele.release_date,
          ele.poster_path,
          ele.overview
        );
      });
      res.json(movieData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
}
//
function searchHandler(req, res) {
  let movieName = req.query.name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey2}&language=en-US&query=${movieName}`;
  axios
    .get(url)
    .then((result) => {
      let response = result.data.results;
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
}
// Handle 404 Error: Use middle ware
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});
// Handle 500 Error:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
// Building the Constructor
function Movie(id, title, releaseDate, posterPath, overview) {
  (this.id = id),
    (this.title = title),
    (this.releaseDate = releaseDate),
    (this.posterPath = posterPath),
    (this.overview = overview);
}
//
// 3. run server make it listening on port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
