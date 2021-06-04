const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const connection = require("./config");


// Open the MySQL connection
		
	// -> Query data from MySQL
        const sql = 'SELECT * FROM torneo';
        connection.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            //res.json(results);//devuelve los torneos en formato json
          }
          const csvFields = ['ID_Torneo', 'NombreTorneo','ID_Juegos','Cantidad', 'Fecha', 'Premio','Ganador' ];
          const json2csvParser = new Json2csvParser({ csvFields });
          const csv = json2csvParser.parse(results);
  
          console.log(csv);
          
          fs.writeFile('./csv/DatosTorneo.csv', csv, function(err) {
              if (err) throw err;
              console.log('file saved');
          });

        });


		// -> Convert JSON to CSV data
