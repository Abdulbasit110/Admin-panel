import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import * as http from "http";
import { SerialPort } from "serialport";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createPool, Pool, RowDataPacket } from "mysql2/promise";

const app = express();
const server: HttpServer = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Consider specifying trusted origins for security
    },
});
app.use(cors());
app.use(bodyParser.json());

// Create a database connection pool
const pool: Pool = createPool({
    connectionLimit: 10, // Adjust as per your requirements
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Abasit@123",
    database: process.env.DB_NAME || "graph_data",
});

async function insertData(data: DataEntry) {
    console.log("Received data from serial port:", data);

    // Ensure X, Y, Z, and TOTAL are numbers and within the expected range
    if (!isValidData(data)) {
        console.error("Invalid data received:", data);
        return;
    }

    const formattedDate = new Date(data.timestamp * 1000)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    const sql = `INSERT INTO chartdata (TIMESTAMP, X, Y, Z, TOTAL) VALUES(?,?,?,?,?)`;
    try {
        const connection = await pool.getConnection();
        await connection.execute(sql, [
            data.timestamp,
            data.x,
            data.y,
            data.z,
            data.total,
        ]);
        connection.release(); // Release the connection back to the pool
        console.log(`Inserted data: ${formattedDate}, ${data.timestamp}`);
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}

function isValidData(data: DataEntry): boolean {
    return (
        typeof data.x === "number" &&
        data.x <= 9999999.9999997 &&
        typeof data.y === "number" &&
        data.y <= 9999999.9999997 &&
        typeof data.z === "number" &&
        data.z <= 9999999.9999997 &&
        typeof data.total === "number" &&
        data.total <= 9999999.9999997
    );
}
// Define a route to handle GET requests for fetching data
app.get("/fetchData", async (req, res) => {
    try {
        // Call the function to fetch average values
        const data = await fetchAverageAndRMSValues();
        const formattedData = data.map((entry) => ({
            TIMESTAMP: entry.TIMESTAMP,
            avgX: parseFloat(entry.avgX).toFixed(2),
            avgY: parseFloat(entry.avgY).toFixed(2),
            avgZ: parseFloat(entry.avgZ).toFixed(2),
            avgTotal: parseFloat(entry.avgTotal).toFixed(2),
            rmsX: parseFloat(entry.rmsX).toFixed(2),
            rmsY: parseFloat(entry.rmsY).toFixed(2),
            rmsZ: parseFloat(entry.rmsZ).toFixed(2),
            rmsTotal: parseFloat(entry.rmsTotal).toFixed(2),
        }));
        res.json(formattedData);
    } catch (error) {
        console.error("Error handling fetch data request:", error);
        res
            .status(500)
            .json({ error: "An error occurred while handling fetch data request" });
    }
});

// Function to fetch average values for each x, y, z, and total for all timestamps
// Function to fetch average and RMS values from the database
async function fetchAverageAndRMSValues(): Promise<any[]> {
    try {
        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Execute the SQL query to fetch average and RMS values
        const [rows]: [RowDataPacket[], any[]] = await connection.execute(`
    SELECT
    TIMESTAMP,
    AVG(x) AS avgX,
    AVG(y) AS avgY,
    AVG(z) AS avgZ,
    AVG(total) AS avgTotal,
    SQRT(AVG(x*x)) AS rmsX,
    SQRT(AVG(y*y)) AS rmsY,
    SQRT(AVG(z*z)) AS rmsZ,
    SQRT(AVG(total*total)) AS rmsTotal
FROM
    (SELECT * FROM graph_data.chartdata ORDER BY TIMESTAMP DESC LIMIT 18000) AS last_18000
WHERE
    LENGTH(TIMESTAMP) = 10 AND TIMESTAMP != 0
GROUP BY
    TIMESTAMP;

    `);
        console.log("Fetched rows:", rows); // Add this line for debugging

        // Release the connection back to the pool
        connection.release();

        return rows;
    } catch (error) {
        console.error("Error fetching average and RMS values:", error);
        throw error;
    }
}
// Define a route to handle POST requests for connecting to the serial port
app.post("/connectSerialPort", async (req, res) => {
    try {
        await initializeSerialPort();
        res.status(200).json({ message: "Serial port initialized successfully" });
    } catch (error) {
        console.error("Error initializing serial port:", error);
        res.status(500).json({ error: "Error initializing serial port" });
    }
});

async function initializeSerialPort() {
    try {
        const ports = await SerialPort.list();
        console.log(ports);

        const espPort = ports.find((port) => port.manufacturer === "Microsoft");
        console.log(espPort);
        if (!espPort) {
            console.error("Port not found.");
            return;
        }

        const portName = espPort.path;
        console.log("Port:", portName);
        const port = new SerialPort({ path: portName, baudRate: 9600 });

        port.on("error", (err) => {
            console.error("Error connecting to serial port:", err.message, err);
        });

        port.on("open", async () => {
            console.log("Serial port connected successfully");
            let dataBuffer = "";
            let bufferEnabled = true; // Assume buffer is enabled initially
            port.on("data", (data: Buffer) => {
                dataBuffer += data.toString();

                const lines = dataBuffer.split("\n");
                while (lines.length > 1) {
                    const line = lines.shift(); // Remove the first line from the array
                    if (line) {
                        if (line.includes(",")) {
                            // This is a data line, process it
                            const parts = line.split(",");
                            if (parts.length >= 5) {
                                // Ensure there are at least 5 parts (timestamp, x, y, z, total)
                                const [timestamp, x, y, z, total] = parts.map((part) =>
                                    parseFloat(part)
                                );
                                console.log(
                                    ` Timestamp: ${timestamp}, x: ${x}, y: ${y}, z: ${z}, total: ${total}`
                                );
                                // Emit these values to connected clients
                                io.emit("dataReceived", {
                                    timestamp,
                                    x,
                                    y,
                                    z,
                                    total,
                                });
                                // Insert data into the database
                                if (bufferEnabled) {
                                    insertData({
                                        timestamp,
                                        x,
                                        y,
                                        z,
                                        total,
                                    });
                                }
                            } else {
                                console.log(`Incomplete data line: ${line}`);
                            }
                        } else {
                            console.log(`Configuration line: ${line}`);
                            if (line.includes("Buffer is disabled")) {
                                bufferEnabled = false; // Disable buffer
                            }
                        }
                    }
                    // Update the buffer with the remaining lines
                    dataBuffer = lines.join("\n");
                }
            });
        });
    } catch (error) {
        console.error("Error initializing serial port:", error);
    }
}

// Define the DataEntry interface
interface DataEntry {
    timestamp: number;
    x: number;
    y: number;
    z: number;
    total: number;
}

// Initialize the serial port
initializeSerialPort();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});