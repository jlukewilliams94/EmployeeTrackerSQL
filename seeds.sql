-- Drops the employee_management_db if it exists currently --
DROP DATABASE IF EXISTS employee_management_db;
-- Creates the "employee_management_db" database --
CREATE DATABASE employee_management_db;

-- Ensures which schema/database is used for the following SQL queries. 
USE employee_management_db;

-- Creates table for department 
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    department_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
)

-- Creates table for roles
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL, 
    department_id INT NOT NULL,
    PRIMARY KEY (id)
)

-- Creates table for employee
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR (30) NOT NULL, 
    last_name VARCHAR (30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT, 
    PRIMARY KEY (id)
)

-- Example INPUT into department table
INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO department (department_name)
VALUES ("Legal");

-- Example INPUT into role table

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Representitve", 40000 , 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Sales Lead", 80000 , 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Application Engineer", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Application Engineer", 75000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 65000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Book Keeper", 35000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("House Council", 120000, 4);

-- Example INPUT into employee table

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Glennon", 1, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lucy", "Duet", 2, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luke", "Williams", 3, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nicole", "Gleason", 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bailey", "Hoch", 5, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Roelvis", "Vargas", 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Keith", "George", 7, NULL);
