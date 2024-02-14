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
// const url = `postgres://yaman:0000@localhost:5432/lab13`;
const url = process.env.DB_URL;
const client = new Client(url); //????

// =-=-=-=-=-
// routs
app.get("/", homeHandler); // endpoint
app.post("/addMovie", addMovieHandler); // endpoint
app.get("/getMovies", getMoviesHandler); // endpoint
app.put("/editMovie/:id", editMovieHandler); // endpoint
app.delete("/deleteMovie/:id", deleteMovieHandler); // endpoint
// functions
function homeHandler(req, res) {
  res.send("Welcome Home!");
}
function addMovieHandler(req, res) {
  console.log(req.body);
  //
  const { title, releaseDate, posterPath, overview, comments } = req.body; // destructuring ES6 features
  const sql = `INSERT INTO movie (title, releaseDate, posterPath, overview, comments)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`; // $: encoded data: security: sql injection. hacking technique.
  const values = [title, releaseDate, posterPath, overview, comments];
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
function editMovieHandler(req, res) {
  console.log(req.params);
  let movieId = req.params.id;
  console.log(req.body);
  let { title, releaseDate, posterPath, overview, comments } = req.body;
  let sql = `UPDATE movie
  SET title = $1, releaseDate = $2, posterPath = $3, overview = $4, comments = $5
  WHERE id = $6;`;
  let values = [title, releaseDate, posterPath, overview, comments, movieId];
  client
    .query(sql, values)
    .then((result) => {
      res.send("successfully updated");
    })
    .catch();
}
function deleteMovieHandler(req, res) {
  console.log(req.params);
  let { id } = req.params;
  let sql = `DELETE FROM movie WHERE id = $1;`;
  let values = [id];
  client
    .query(sql, values)
    .then((result) => {
      res.status(204).send("successfully deleted");
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
