var mysql = require("mysql");

var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});



connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  getItems();
});

var getItems = function() {
	console.log("Selecting all items for sale...\n");
	connection.query("SELECT * FROM products", function(err, res) {
	  if (err) throw err;
	  // Log all results of the SELECT statement
	  // console.log(res);
	  for (var i = 0; i < res.length; i++) {
	  	console.log(res[i]);
	  	console.log("----------");
	  }
	  userPrompt();
	  
	});
}


var userPrompt = function() {
	inquirer.prompt([
	{
		name: "itemID",
		type: "input",
		message: "What is the id of the product you would like to buy?"
	}	
	]).then(function(answer) {
		var item = answer.itemID;
		console.log(item);
		inquirer.prompt([
		{
			name: "ammount",
			type: "input",
			message: "How manny units would you like to buy?"
		}	
		]).then(function(answer) {
			var quantity = answer.ammount;
			// console.log(item, quantity);
			connection.query("SELECT stock_quantity FROM products WHERE id=?",[item], function(err, res) {
				// console.log(res);
				// console.log(res[0].stock_quantity);
				var stockQuantity = res[0].stock_quantity;
				// console.log(stockQuantity)
				if (stockQuantity > quantity) {
					var newStockQuantity = stockQuantity - quantity;
					console.log(newStockQuantity);
					connection.query("UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: newStockQuantity
						},
						{
							id: item
						}
					],	
					function(err, res) {
						console.log("Yay invinotry update...");
						givePrice(quantity, item);
					})
				}
				else {
					console.log("Sorry there is insefiecient invinotry for a purchase that large.");
					connection.end(); 
				}
			})
		})
	})
}


function givePrice(quantity, item) {
	connection.query("SELECT price FROM products WHERE id=?", [item], function(err, res) {
		var pricePerUnit = (res[0].price);
		
		var ammountDue = parseInt(quantity) * pricePerUnit ;
		console.log("Your total is: ", ammountDue);
		connection.end(); 
	})
}






