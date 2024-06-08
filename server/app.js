const express = require("express");
const mysql2 = require("mysql2");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const port = 3001;

// Create a MySQL connection
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Abasit@123",
  database: "graph_data",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define your endpoint to fetch xValues from the database
app.get("/values", (req, res) => {
  // Assuming you have a table named 'x_values' with a column named 'value'
  connection.query(
    `WITH avg_data AS (
    SELECT
        date,
        time,
        AVG(x) AS avg_x,
        AVG(y) AS avg_y,
        AVG(z) AS avg_z,
        AVG(total) AS avg_total
    FROM mysqldata
    GROUP BY date, time
)
SELECT
    date,
    time,
    avg_x,
    avg_y,
    avg_z,
    avg_total
FROM avg_data`,
    (err, results) => {
      if (err) {
        console.error("Error querying MySQL:", err);
        res.status(500).send("Error fetching xValues");
        return;
      }
      res.json(results);
    }
  );
});

app.get("/normalValues", (req, res) => {
  connection.query(`SELECT *  FROM mysqldata`, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).send("Error fetching values");
      return;
    }
    res.json(results);
  });
});

app.post("/device-data", (req, res) => {
  const { x, y, z, total, date, time } = req.body; // Assuming your request body contains these fields

  // Insert the received data into your MySQL database
  connection.query(
    `INSERT INTO mysqldata (x, y, z, total, date, time) VALUES (?, ?, ?, ?, ?, ?)`,
    [x, y, z, total, date, time],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      // console.log("Data inserted into MySQL successfully");
      res.status(201).send("Data inserted successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
