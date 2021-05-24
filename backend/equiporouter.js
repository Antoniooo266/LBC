const connection = require("./config");
var express = require("express");
var router = express.Router();


router.get("/get", (req, res) => {
    const sql = "SELECT * FROM equipo";
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send("No hay resultados :(");
      }
    });
  });

  module.exports = router;