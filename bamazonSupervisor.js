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
		if (answer.options = 'View Product Sales be Department') {
			getTableData();
		}
	})
}

// function songAndAlbumSearch() {

//       var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";

//       connection.query(query, [answer.artist, answer.artist], function(err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Album Position: " +
//               res[i].position +
//               " || Artist: " +
//               res[i].artist +
//               " || Song: " +
//               res[i].song +
//               " || Album: " +
//               res[i].album +
//               " || Year: " +
//               res[i].year
//           );
//         }

//         runSearch();
//       });
// }

// "SELECT departments.department_id, products.department_name"
// FROM departments
// INNER JOIN products ON departments.department_name = products.department_name;

// 	console.table([
// 	  {
// 	    department_id: ,
// 	    department_name: 10,
// 	    over_head_costs: 0,
// 	    product_sales: 0,
// 	    total_profit: 0,
// 	  }, {
// 	    name: 'bar',
// 	    age: 20
// 	  }
// 	]);

var getTableData = function() {
	var query = "SELECT departments.department_id, products.department_name, departments.over_head_costs, products.product_sales ";
	query += "FROM departments INNER JOIN products ";
	query +=  "ON departments.department_name = products.department_name";
	// query += "products.department_name, products.total_profit ";
	// query += "FROM departments INNER JOIN products ON (departments.department_name = products.department_name)";
	connection.query(query, function(err, res) {
		console.log(res);

		for (var i = 0; i < res.length; i++) {
			console.table([
			{
				department_id: res[i].department_id,
				department_name: res[i].department_name,
				over_head_costs: res[i].over_head_costs,
				product_sales: res[i].product_sales,
				total_profit:0
			}
			])
		}
		
	});
	// 	for (var i = 0; i < res.length; i++) {
	// 		console.log(res[i].department_name);
	// 		console.log(res[i].product_sales); 
	// 	}
	// 	console.log(res);
	// 	console.log(res.length);
		
	// });
	// connection.query("SELECT * FROM departments", function(err, res){
	// 	console.log("----------------");
	// 	console.log(res);
	// })
	// console.table([
	// {
	// 	name: 'Christina',
	// 	age: 24
	// }, {
	// 	name: 'Tommy',
	// 	age: 25
	// }
	// ])
}

// var displayData = function() {



// }

//department_id	department_name	over_head_costs	product_sales	total_profit
//01	Electronics	10000	20000	10000
//02	Clothing	60000	100000	40000

// prints
//name  age
//----  ---
//foo   10
//bar   20


