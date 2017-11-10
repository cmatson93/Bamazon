DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(20) NOT NULL,
  department_name VARCHAR(20),
  bid DECIMAL(10, 2) DEFAULT 0,
  PRIMARY KEY (id)
);




INSERT INTO items (name) values ('iPhone');
INSERT INTO items (name) values ('IKEA Desk');

INSERT INTO task (name) values ('Pick up Paper');
INSERT INTO task (name) values ('Mow Lawn');

INSERT INTO jobs (name) values ('ESL Teacher');
INSERT INTO jobs (name) values ('Accountant');

INSERT INTO projects (name) values ('Build Web Page');
INSERT INTO projects (name) values ('Do Homework');

DELETE FROM items WHERE id=3;