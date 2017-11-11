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
  managerPrompt();
});

var managerPrompt = function() {
	inquirer.prompt([
	{
		name: "itemID",
		type: "list",
		message: "What would you like to do?",
		choices: ['View Low Inventory', 'Add to Inventory', 'View Products for Sale', 'Add New Product']
	}	
	]).then(function(answer){
		switch(answer.itemID) {
			case "View Low Inventory":
				getLowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "View Products for Sale":
				viewProducts();
				break;
			case "Add New Product":
				addNewProduct();
				break;
		}
	})
}

// "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1"

//View Low Inventory, then it should list all items with an inventory count lower than five.
var getLowInventory = function() {
	connection.query("SELECT product_name FROM products WHERE stock_quantity < 5", function(err, res) {
	  if (err) throw err;
	  // Log all results of the SELECT statement
	  // console.log(res);
	  for (var i = 0; i < res.length; i++) {
	  	console.log(res[i].product_name);
	  	console.log("----------");
	  }
	  connection.end();
	  
	});
};

//Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
var addInventory = function() {
	connection.query("SELECT * FROM products", function(err, results) {
	  if (err) throw err;
	  console.log(results);
	inquirer
	    .prompt([
	        {
	          name: "choice",
	          type: "list",
	          choices: function() {
	            var choiceArray = [];
	            for (var i = 0; i < results.length; i++) {
	              choiceArray.push(results[i].product_name);
	            }
	            return choiceArray;
	          },
	          message: "What item would you like to add more to?"
	        },
	        {
	          name: "add",
	          type: "input",
	          message: "How many items would you like to add it?"
	        }
	      ]).then(function(answer) {
	      	var chosenItem;
  	        for (var i = 0; i < results.length; i++) {
  	          if (results[i].product_name === answer.choice) {
  	            chosenItem = results[i];
  	          }
  	        }
      	    var addQuantity = parseInt(answer.add);
      	    var newQuantity = parseInt(chosenItem.stock_quantity) + addQuantity;
      	    var itemName = chosenItem.product_name;
  	        connection.query(
  	        	"UPDATE products SET ? WHERE ?",
  	        	[
  	        		{
  	        			stock_quantity: newQuantity
  	        		},
  	        		{
  	        			product_name: itemName
  	        		}
  	        	],
  	        	function(error) {
  	        		// if (error) throw err;
  	        		console.log("Inventory Added.");
  	        		connection.end();
  	        	}
  	        );
	    })
	});
};
//View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
var viewProducts = function() {
	connection.query("SELECT * FROM products", function(err, res) {
	  if (err) throw err;
	  // Log all results of the SELECT statement
	  // console.log(res);
	  for (var i = 0; i < res.length; i++) {
	  	console.log(res[i]);
	  	console.log("----------");
	  }
	  connection.end();
	  
	});
};
//Add New Product, it should allow the manager to add a completely new product to the store.
var addNewProduct = function() {
	inquirer.prompt([

	{
		name: "newItem",
		type: "input",
		message: "What item would you like to add to the inventory?"
	},
	{
		name: "department",
		type: "input",
		message: "What department is this item in?"
	},
	{
		name: "cost",
		type: "input",
		message: "How much does this item cost?"
	},
	{
		name: "stock",
		type: "input",
		message: "How many of these items would you like to add to the inventory?"
	}
	]).then(function(answer) {
		connection.query(
			"INSERT INTO products SET ?",
			{
				product_name: answer.newItem,
				department_name: answer.department,
				price: answer.cost,
				stock_quantity: answer.stock
			},
			function(err) {
				if (err) throw err;
				console.log("Your item was added.");
				connection.end();
			}
		
		);
	})
};




