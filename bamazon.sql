DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100),
    department_name VARCHAR
    (100),
    price INT
    (10),
    stock_quantity INT
    (10),
    PRIMARY KEY
    (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("fishing gear", "outdoor", 100, 5);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("baseball", "sports", 20, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("football", "sports", 20, 10);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("boxing", "sports", 15, 40);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("camping gear", "outdoor", 35, 10);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("kite", "outdoor", 25, 5);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("chair", "decor", 65, 10);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("lamp", "decor", 40, 5);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("fish tank", "decor", 25, 8);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("basket", "decor", 20, 3);

    SELECT *
    FROM products;