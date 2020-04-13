const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")

require('events').EventEmitter.prototype._maxListeners = 100;


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
    console.log("--------------------------------------------------")
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, department.department_name,  employee.manager_id FROM employee AS employee JOIN role AS role ON employee.role_id = role.id JOIN department AS department ON role.department_id = department.id", function(err, res){
      console.log("WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM")
      console.log("--------------------------------------------------")
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
              keepGoing()
            }
          })
        
      })
      break;
    case "Department":
      connection.query("SELECT * FROM department", function(err, res){
        if (err) throw err
        console.log("--------------------------------------------------")
        console.table(res)
        console.log("--------------------------------------------------")
        createDepartment()
      })
      function createDepartment() {
        inquirer
          .prompt([{
            name: "department",
            type: "input",
            message: "What department would you like to add to the system ?"
          }])
          .then(function(a){
            connection.query("INSERT INTO department SET ?",
            {department_name: a.department}, function(err){
              if (err) throw err
              console.log("Department as been added to system")
              keepGoing()
            })
          })
      }
      break;
    case "Role":
      connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err
        console.log("--------------------------------------------------")
        console.table(res)
        console.log("--------------------------------------------------")
        createRole()
      })
      function createRole() {
        inquirer
          .prompt([{
            name: "role",
            type: "input",
            message: "What role would you like to add to the system ?"
          },
          {
            name: "salary", 
            type: "number",
            message: "What is the new positions salary?"
          },
          {
            name: "department_id",
            type: "number",
            message: "What department id is new position associated with?"
          }
        ])
        .then(function (b){
          connection.query("INSERT INTO role SET ?", 
          { title: a.department,
            salary: a.salary, 
            department_id: b.department_id
          }
          ,function (err){
            console.log("Department as been added to system")
            console.log("--------------------------------------------------")
            keepGoing()
          })
        })
      }
  }
}

function viewInfo(option) {
  switch(option) {
    case "Employee":
      connection.query("SELECT * from employee", function(err, res){
        if (err) throw err;
        console.log("--------------------------------------------------")
        console.table(res)
        console.log("--------------------------------------------------")
        keepGoing()
      })
      break;
    case "Role":
      connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.log("--------------------------------------------------")
        console.table(res)
        console.log("--------------------------------------------------")
        keepGoing()
      })
      break;
    case "Department":
      connection.query("SELECT * FROM department", function(err, res){
        if (err) throw err;
        console.log("--------------------------------------------------")
        console.table(res)
        console.log("--------------------------------------------------")
        keepGoing()
      })
      break;
  }
}

function updateInfo(option) {
  switch(option){
    case "Employee":
      inquirer
        .prompt([
          {
            name: "employeeOption",
            type: "list",
            message: "What would you like to update in the Employee table ?",
            choices:[
              "Change Employees Role",
              "Change Employees Manager"
            ]
          }
        ])
        .then(function(answer){
          if (answer.employeeOption === "Change Employees Role"){
            changeRole()
          } else {
            changeManager()
          }
    });
    break;
    case "Department":
      console.log("Apologize, we cannot update the Department Table at this time")
      keepGoing()
    break;
    case "Role":
      console.log("Apologize, we cannot update the Role Table at this time")
      keepGoing()
    break;  
  }
}

function changeRole (){
  connection.query("SELECT * FROM role", function(err, res){
    if (err) throw err;
    const roles = res.map(object => {
    return {
        name: object.title,
        value: object.id
    }
    })
    connection.query("SELECT * FROM employee", function(error, result){
      if (error) throw error;
      const employees = result.map(object => {
        return {
          name : `${object.first_name} ${object.last_name}`,
          value: object.id
        }
      })
      inquirer
        .prompt([
        {
          name: "employee", 
          type: "list", 
          message: "Which employee's position would you like to update ?", 
          choices: employees
        },
        {
          name: "newRole",
          type: "list",
          message: "What would you like the employees new role to be ?",
          choices: roles
        }
      ])
      .then(function (a){
        connection.query("UPDATE employee SET ? WHERE ?", 
        [{role_id: a.newRole
        },
        {id: a.employee
        }],
        function(err){
          if (err) throw err;
          console.log("--------------------------------------------------")
          keepGoing()
        })
      })
    })
  })
}

function changeManager(){
  connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw err;
    const employees = result.map(object => {
      return {
        name : `${object.first_name} ${object.last_name}`,
        value: object.id
      }
    })
    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function(error, result){
      const managers = result.map(object=> {
        return {
          name : `${object.first_name} ${object.last_name}`,
          value: object.id
        }
      })
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list", 
            message: "For which Employee would you like update their Manager ?",
            choices: employees
          },
          {
            name: "newManager",
            type: "list", 
            message: "Which Manager would you like to have as the Employees new Manager ?", 
            choices: managers
          }
        ])
        .then(function (a){
          connection.query("UPDATE employee SET ? WHERE ?",
          [{
            manager_id: a.newManager
          },
          {
            id: a.employee
          }],
          function (err){
            if (err) throw err;
            console.log("--------------------------------------------------")
            keepGoing()
          })
        })
    })
  })
}



function keepGoing() {
  inquirer.prompt({
          name: "action",
          type: "list",
          message: "Would you like to continue to exit?",
          choices: ["CONTINUE", "EXIT"]
      })
      .then(function (res) {
          switch (res.action) {
              case "EXIT":
                  connection.end();
                  break;
              case "CONTINUE":
                  runSearch();
                  break;
          }
      })
      .catch(function (err) {
          console.log(err);
      })
}