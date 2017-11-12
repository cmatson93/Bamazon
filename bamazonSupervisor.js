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

//list set of menue items...
	//View Product Sales by Department
	//Create New Department
var userPrompt = function() {
	inquirer.prompt([
	{
		type: "list",
		name: "options",
		list: ['View Product Sales by Department', 'Create New Department'],
		message: "What would you like to do<"
	}	
	])
}