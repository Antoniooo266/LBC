const connection = require("./config");
var express = require("express");

const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("./csv/DatosEquipo.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();


    // open the connection
        let query =
          "INSERT INTO equipo (NombreEquipo, Fecha, Victorias, Derrotas) VALUES ?";
        connection.query(query, [csvData], (error, response) => {
          console.log(error || response);
        });
      
    });

stream.pipe(csvStream);