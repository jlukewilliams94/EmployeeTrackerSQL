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
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, department.department_name,  employee.manager_id FROM employee AS employee JOIN role AS role ON employee.role_id = role.id JOIN department AS department ON role.department_id = department.id", function(err, res){
      console.table(res)
      console.log("--------------------------------------------------")
      runSearch()
    })
});


function runSearch() {
  inquirer
    .prompt([{
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
      message: "Select and option from the below table ?",
      choices: [
        "Department",
        "Employee",
        "Role"
      ]
    }])
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
      connection.query("SELECT * FROM role", function(err, res){
        const roles = res.map(object => {
          return {
              name: object.title,
              value: object.id
          }
        })
          inquirer
            .prompt([{
              name: "first_name",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "role",
              type: "list",
              message: "What is the employee's title",
              choices: roles
            },
            {
              name: "manager",
              type: "input",
              message: "Who is the employee's manager?",
              default: "null"
            },
          ])
          .then(function(res){
            connection.query("INSERT INTO employee SET ?", {
              first_name: res.first_name,
              last_name: res.last_name,
              title: res.title, 
              manager_id: res.manager
            }), 
            function (err){
              if (err) throw err
              console.log("Employee as been added to system")
              runSearch()
            }
          })
        
      })
    case "Department":
      connection.query("SELECT * FROM department", function(err, res){
        if (err) throw err
        console.table(res)
        console.log("--------------------------------------------------")
        createDepartment()
      })
      function createDepartment() {
        inquirer
          .prompt([{
            name: "department",
            type: "input",
            message: "What department would you like to add?"
          }])
          .then(function(a){
            connection.query("INSERT INTO department SET ?",
            {department_name: a.department}, function(err){
              if (err) throw err
              console.log("Department as been added to system")
              runSearch()
            })
          })
      }
    case "Role":
      connection.query("SELECT * From ")
  }
}
