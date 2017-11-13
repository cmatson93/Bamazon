DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(20) NOT NULL,
  department_name VARCHAR(20),
  price DECIMAL(20, 2) NOT NULL,
  stock_quantity INTEGER(100) DEFAULT 0,
  PRIMARY KEY (id)
);

ALTER TABLE products ADD COLUMN product_name VARCHAR(20) NOT NULL;

ALTER TABLE products ADD COLUMN product_sales DECIMAL (20, 2) DEFAULT 0;

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Desk', 'Furniture', 200, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('iPhoneX', 'Technology', 1000, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Coffee Mug', 'Home Goods', 2, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Echo', 'Technology', 150, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Bed Sheets', 'Home Goods', 15, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Computer Monitor', 'Technology', 220, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Supper Mario Odessey', 'Games', 57, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Toothbrush', 'Personal Care', 1.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Eufy RoboVac', 'Home Goods', 249.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('The Martian', 'Books', 20, 5);


CREATE TABLE departments(
  department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(20),
  over_head_costs DECIMAL(20, 2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_id, department_name, over_head_costs) values (1, 'Furniture', 25);
INSERT INTO departments (department_id, department_name, over_head_costs) values (2, 'Technology', 80);
INSERT INTO departments (department_id, department_name, over_head_costs) values (3, 'Home Goods', 50);
INSERT INTO departments (department_id, department_name, over_head_costs) values (4, 'Games', 30);
INSERT INTO departments (department_id, department_name, over_head_costs) values (5, 'Personal Care', 15);
INSERT INTO departments (department_id, department_name, over_head_costs) values (6, 'Boods', 5);


SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;


