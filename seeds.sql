-- Drops the employee_management_db if it exists currently --
DROP DATABASE IF EXISTS employee_management_db;
-- Creates the "employee_management_db" database --
CREATE DATABASE employee_management_db;

USE employee_management_db;

-- Creates table for department 
CREATE TABLE department (
    id INT NOT NULL, 
    name VARCHAR (30) NOT NULL
    PRIMARY KEY (id)
)

-- Creates table for roles
CREATE TABLE role (
    id INT NOT NULL, 
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,4) NOT NULL, 
    department_id INT NOT NULL,
    PRIMARY KEY (id)
)

-- Creates table for employee
CREATE TABLE employee (
    id INT NOT NULL, 
    first_name VARCHAR (30) NOT NULL, 
    last_name VARCHAR (30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT, 
    PRIMARY KEY (id)
)