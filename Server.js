let mySQL = require("mysql")
let inquirer = require("inquirer")


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mustangs!11",
    database: ""
});
  
// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});
