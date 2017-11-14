var mysql = require("mysql");

var inquirer = require("inquirer");

require("console.table");


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
  // console.log("connected as id " + connection.threadId + "\n");
  getItems();
});

var getItems = function() {
	console.log("Selecting all items for sale...\n");
	connection.query("SELECT * FROM products", function(err, res) {
	  if (err) throw err;

	  var values = [];

	  for (var i = 0; i < res.length; i++) {
	  	var row = [res[i].id ];
	  	row.push(res[i].product_name);
	  	row.push(res[i].price);
	  	values.push(row);
	  }

	  console.table(['id', 'product_name', 'price'], values);

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
		inquirer.prompt([
		{
			name: "ammount",
			type: "input",
			message: "How manny units would you like to buy?"
		}	
		]).then(function(answer) {
			var quantity = answer.ammount;
			connection.query("SELECT stock_quantity FROM products WHERE id=?",[item], function(err, res) {
				var stockQuantity = res[0].stock_quantity;
				if (stockQuantity > quantity) {
					var newStockQuantity = stockQuantity - quantity;
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
		console.log("Your total is: $", ammountDue);
		// connection.query("UPDATE ")
		updateRevenue(ammountDue, item);
	})
}


function updateRevenue(ammountDue, item) {
	connection.query("SELECT product_sales FROM products WHERE id=?", [item], function(err, res) {
		// console.log(res[0].product_sales);
		var currentRevenue = res[0].product_sales;
		var newRevenue = parseInt(currentRevenue) + ammountDue;
		// console.log(newRevenue);
		// updateRevenue(ammountDue, item);
		connection.query("UPDATE products SET ? WHERE ? ",
			[
				{
					product_sales: newRevenue
				},
				{
					id: item
				}
			],
			function(err, res) {
				console.log("Thank you for making a purchase.");
				connection.end()
			}
		)
	})
}







