const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mustangs!11",
    database: "employee_management_db"
});
  
// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
    runSearch()
});


function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do ?",
      choices: [
        "Add",
        "View",
        "Update",
        "Delete"
      ]
    },
    {
      name: "option",
      type: "list",
      message: "Select and option from the below table",
      choices: [
        "Department",
        "Employee",
        "Role"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add":
        addInfo(answer.option)
        break;

      case "View":
        viewInfo(answer.option)
        break;

      case "Update":
        updateInfo(answer.option)
        break;

      case "Delete":
        deleteInfo(answer.option)
        break;
      }
    })
    .catch(function(err){
      console.log(err)
    })
};

function addInfo(option) {
  switch(option) {
    case "Employee":

  }
}
