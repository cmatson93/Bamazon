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
  userPrompt();
});

//list set of menue items...
	//View Product Sales by Department
	//Create New Department
var userPrompt = function() {
	inquirer.prompt([
	{
		type: "list",
		name: "options",
		choices: ['View Product Sales by Department', 'Create New Department', 'Quit'],
		message: "What would you like to do<"
	}	
	]).then(function(answer){
		switch(answer.options) {
			case 'View Product Sales by Department':
				getTableData();
				break;

			case 'Create New Department':
				addDepartment();
				break;

			case 'Quit':
				connection.end();	
		}
	})
}




var getTableData = function() {
	var query = "SELECT departments.department_id, products.department_name, departments.over_head_costs, products.product_sales ";
	query += "FROM departments INNER JOIN products ";
	query +=  "ON departments.department_name = products.department_name";
	// query += "products.department_name, products.total_profit ";
	// query += "FROM departments INNER JOIN products ON (departments.department_name = products.department_name)";
	connection.query(query, function(err, res) {

		var values = [];

		for (var i = 0; i < res.length; i++) {
			var row = [res[i].department_id ];
			row.push(res[i].department_name);
			row.push(res[i].over_head_costs);
			row.push(res[i].product_sales);
			var total_profit = res[i].product_sales - res[i].over_head_costs;
			values.push(row);
		}

		console.table(['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'], values);

		userPrompt();
	});
}

var addDepartment = function() {
	inquirer.prompt([
	{
		type: "input",
		name: "department",
		message: "What is the department name of the department you would like to add?"
	},
	{
		type: "input",
		name: "overhead",
		message: "What are the over head costs for this department?"
	}
	]).then(function(answer){
		connection.query(
			"INSERT INTO departments SET ?",
			{
				department_name: answer.department,
				over_head_costs: answer.overhead
			},
			function(err) {
				if (err) throw err;
				console.log("Your department was added.");
				userPrompt();
			}
		
		);
	})
}



