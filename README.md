# Movies-Library - version 1.0.0
**Author Name**: Mohamed Yaman Katalan


## WRRC
![No Img](./WRRC.jpg)

## Overview
This project is a simple Node.js application using Express as a web framework and PostgreSQL as the database. The application provides basic CRUD (Create, Read, Update, Delete) operations for a movie database.


## Getting Started
### Node.js:
- Node.js is a runtime environment for executing JavaScript code outside the browser. It leverages the V8 engine to provide server-side capabilities.

### Express.js:
- Express.js is a JavaScript framework commonly used for building servers. It simplifies the process of developing robust and scalable web applications.

### Steps to Build a Server Using Express:
1. **Initialize a Node.js Project:**
   - Run `npm init -y` to create a `package.json` file with default settings.

2. **Create Server Script:**
   - Create an `index.js` file (you can choose any name) to write your server-side code.

3. **Install Express:**
   - Execute `npm install express` to install the Express package for your project.

4. **Run the Server:**
   - Start your server by running `node index.js`.

5. **Working with PostgreSQL:**
   - Start and stop the PostgreSQL server using `sqlstart` and `sqlstop` commands.
   - Use `psql` to enter the default database shell.
   - Create a new database within the shell: `CREATE DATABASE name;`
   - List all databases: `\l`
   - Enter a specific database: `psql lab13`
   - List all tables within the database: `\d`
   - Run SQL commands from a file to create a table or connect it to the database: `psql -d lab13 -f schema.sql` (Note: Avoid executing this in the database shell).
   - Install the `pg` package using `npm install pg`.
   - Require the `pg` package in your code for PostgreSQL functionality.
   - Save data in the database by handling POST requests, creating routes, and interfacing with the database.
   - Utilize the `body-parser` package to collect request data from the body.
   - Retrieve data from a table using SQL queries, such as `SELECT * FROM tableName`.

## Project Features
- Express Server: The project utilizes the Express.js framework to handle HTTP requests and responses, making it easy to create RESTful APIs.

- Database Connection: It connects to a PostgreSQL database using the pg library. The database connection string is securely stored in a .env file.

- Endpoints:
GET /: A welcome message indicating the home endpoint.
POST /addMovie: Adds a new movie to the database. Data is sent in the request body, and SQL injection is prevented by using parameterized queries.
GET /getMovies: Retrieves all movies from the database.
