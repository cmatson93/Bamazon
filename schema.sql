DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_product_name VARCHAR(20) NOT NULL,
  department_name VARCHAR(20),
  price DECIMAL(10000, 2) NOT NULL,
  stock_quantity INTEGER(1000) DEFAULT 0,
  PRIMARY KEY (id)
);




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

