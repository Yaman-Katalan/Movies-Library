// 1. require express framework
const express = require("express");
// 2. invoke express
const app = express();
// require cors
const cors = require("cors");
const port = 3000;
// after the decleration of the app
app.use(cors());
const movieData = require("./Movie Data/data.json");
//  Routing
// path - rout - endpoint - URI: Uniform Resource Identifier
//  app.METHOD(PATH, HANDLER)
//
// Routs
app.get("/favorite", favoriteRouteHandler);
app.get("/", homePageHandler); // Home
app.get("*", handle404Error);
//
// Handlers
// http://localhost:3000/favorite
function favoriteRouteHandler(req, res) {
  res.send("Welcome to Favorite Page");
}
// http://localhost:3000/
function homePageHandler(req, res) {
  let result = new Movie(
    movieData.title,
    movieData.poster_path,
    movieData.overview
  );
  res.json(result);
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
function Movie(title, posterPath, overview) {
  (this.title = title),
    (this.poster_path = posterPath),
    (this.overview = overview);
}
//
// 3. run server make it listening on port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
