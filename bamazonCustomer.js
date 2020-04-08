var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "0823Natalie",
    database: "bamazon_DB"
});

//Establish Connection
connection.connect(function (err) {
    if (err) throw err;
   // printOut();
    displaymenu();
});

//print out all products from bamazon_DB using a for loop
function printOut() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID Number: " + res[i].id + "\n"
                + "Product: " + res[i].product_name + "\n"
                + "Department: " + res[i].department_name + "\n"
                + "Price: $" + res[i].price + "\n"
                + "Quantity: " + res[i].stock_quantity);
            console.log("--------------")
        }
        displaymenu();
        //start inquirer prompts
        //askQuestion();

    });
}

//inquirer function to search for id, then how many units they'd like to buy
// if not enough reply insufficient amount of product, or update database if we do have enough
function askQuestion() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "To purchase an item please enter it by ID:",
        },
        {
            type: "input",
            name: "Quantity",
            message: "How many would you like to purchase?",
        },

    ]).then(function (answers) {


        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, [answers.id, answers.Quantity], function (err, res) {

            var newID = res[answers.id - 1];
            var newQuantity = newID.stock_quantity - answers.Quantity;

            if (answers.Quantity <= newID.stock_quantity) {

                if (err) throw err;

                updateProduct(newQuantity, newID);

                var cost = (answers.Quantity * newID.price);

                console.log("That will be $" + cost + ".");

                //connection.end();

            } else {

                console.log("Insufficient Quantity!")
                displaymenu()
                //connection.end();
            }
        });



    })
};

//separate function to update amount of products
function updateProduct(newQuantity, newID) {
    console.log("Updating quantities for " + newID.product_name + "...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                product_name: newID.product_name
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            displaymenu()
        }
    );
    // logs the actual query being run
    console.log(query.sql);
}
function displaymenu() {
    inquirer.prompt([  
        {
            type: "list",
            name: "userchoice",
            choices: ["displayidems", "orderidem", "exitapplication"],
            message:"what would you like yo do",
        }
    ]).then(function (response) {
        switch (response.userchoice){
            case "displayidems": printOut(); break;
            case "orderidem": askQuestion(); break;
            case "exitapplication": connection.end(); process.exit(0);
        }
    })
}