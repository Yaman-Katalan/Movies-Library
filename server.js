"use strict";
// require express
const express = require("express");
// invoke express
const app = express();
// require dotenv
require("dotenv").config();
// require body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// require axios
const axios = require("axios");
// require cors
const cors = require("cors");
app.use(cors());
// port
const port = process.env.PORT; // sensitive data
// =-=-=-=-=-
const { Client } = require("pg"); //????
// import { Client } from "pg";
const url = `postgres://yaman:0000@localhost:5432/lab13`;
const client = new Client(url); //????

// =-=-=-=-=-
// routs
app.get("/", homeHandler); // endpoint
app.post("/addMovie", addMovieHandler); // endpoint
app.get("/getMovies", getMoviesHandler); // endpoint
// functions
function homeHandler(req, res) {
  res.send("Welcome Home!");
}
function addMovieHandler(req, res) {
  console.log(req.body);
  //
  const { id, title, releaseDate, posterPath, overview, comments } = req.body; // destructuring ES6 features
  const sql = `INSERT INTO movie (id, title, releaseDate, posterPath, overview, comments)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`; // $: encoded data: security: sql injection. hacking technique.
  const values = [id, title, releaseDate, posterPath, overview, comments];
  client
    .query(sql, values)
    .then((result) => {
      console.log(result.rows);
      res.status(201).json(result.rows);
    })
    .catch();
}
function getMoviesHandler(req, res) {
  const sql = `SELECT * FROM movie;`;
  client
    .query(sql)
    .then((result) => {
      const data = result.rows;
      res.json(data);
    })
    .catch();
}
// =-=-=-=-=-=-
// Handle 404 Error: Use middle ware
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});
// Handle 500 Error:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
// Listen
//
client
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch();
//
