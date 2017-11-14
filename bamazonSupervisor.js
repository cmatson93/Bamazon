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
  console.log("connected as id " + connection.threadId + "\n");
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
		choices: ['View Product Sales by Department', 'Create New Department'],
		message: "What would you like to do<"
	}	
	]).then(function(answer){
		if (answer.options === 'View Product Sales be Department') {
			getTableData();
		}
		else {
			addDepartment();
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
		// console.log(res);
		function Row(department_id, department_name, over_head_costs, product_sales, total_profit) {
			this.department_id = department_id;
			this.department_name = department_name;
			this.over_head_costs = over_head_costs;
			this.product_sales = product_sales;
			this.total_profit = total_profit;
		}
		var values = [];
		for (var i = 0; i < res.length; i++) {
			var total_profit = res[i].product_sales - res[i].over_head_costs;
			var row = new Row(res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, total_profit);
			values.push(row);
		}
		// console.log(id);
		console.table(['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'], values);

		connection.end();
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
				connection.end();
			}
		
		);
	})
}



