// 1. require express framework
const express = require("express");
// 2. invoke express
const app = express();
const port = 3000;
const movieData = require("./Movie Data/data.json");
//  Routing
// path - rout - endpoint - URI: Uniform Resource Identifier
//  app.METHOD(PATH, HANDLER)
// http://localhost:3000/favorite
app.get("/favorite", favoriteRouteHandler);
function favoriteRouteHandler(req, res) {
  res.send("Welcome to Favorite Page");
}
// ANOTHER ROUTE
// http://localhost:3000/
app.get("/", homePageHandler);
function homePageHandler(req, res) {
  let result = new Movie(
    movieData.title,
    movieData.poster_path,
    movieData.overview
  );
  res.json(result);
}

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
