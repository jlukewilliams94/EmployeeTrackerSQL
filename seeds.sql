-- Drops the employee_management_db if it exists currently --
DROP DATABASE IF EXISTS employee_management_db;
-- Creates the "employee_management_db" database --
CREATE DATABASE employee_management_db;

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
    salary DECIMAL (10,4) NOT NULL, 
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

INSERT INTO department (id, department_name)
VALUES ();

INSERT INTO role (id, title, salary, department_id)
VALUES ();

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ();