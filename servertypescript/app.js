"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http = __importStar(require("http"));
const serialport_1 = require("serialport");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const promise_1 = require("mysql2/promise");
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Consider specifying trusted origins for security
    },
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Create a database connection pool
const pool = (0, promise_1.createPool)({
    connectionLimit: 10, // Adjust as per your requirements
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Abasit@123",
    database: process.env.DB_NAME || "graph_data",
});
function insertData(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const connection = yield pool.getConnection();
            yield connection.execute(sql, [
                data.timestamp,
                data.x,
                data.y,
                data.z,
                data.total,
            ]);
            connection.release(); // Release the connection back to the pool
            console.log(`Inserted data: ${formattedDate}, ${data.timestamp}`);
        }
        catch (error) {
            console.error("Error inserting data:", error);
        }
    });
}
function isValidData(data) {
    return (typeof data.x === "number" &&
        data.x <= 9999999.9999997 &&
        typeof data.y === "number" &&
        data.y <= 9999999.9999997 &&
        typeof data.z === "number" &&
        data.z <= 9999999.9999997 &&
        typeof data.total === "number" &&
        data.total <= 9999999.9999997);
}
// Define a route to handle GET requests for fetching data
app.get("/fetchData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the function to fetch average values
        const data = yield fetchAverageAndRMSValues();
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
    }
    catch (error) {
        console.error("Error handling fetch data request:", error);
        res
            .status(500)
            .json({ error: "An error occurred while handling fetch data request" });
    }
}));
// Function to fetch average values for each x, y, z, and total for all timestamps
// Function to fetch average and RMS values from the database
function fetchAverageAndRMSValues() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get a connection from the pool
            const connection = yield pool.getConnection();
            // Execute the SQL query to fetch average and RMS values
            const [rows] = yield connection.execute(`
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
    (SELECT * FROM chartdata ORDER BY TIMESTAMP DESC LIMIT 18000) AS last_18000
WHERE
    LENGTH(TIMESTAMP) = 10 AND TIMESTAMP != 0
GROUP BY
    TIMESTAMP;

    `);
            console.log("Fetched rows:", rows); // Add this line for debugging
            // Release the connection back to the pool
            connection.release();
            return rows;
        }
        catch (error) {
            console.error("Error fetching average and RMS values:", error);
            throw error;
        }
    });
}
// Define a route to handle POST requests for connecting to the serial port
app.post("/connectSerialPort", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield initializeSerialPort();
        res.status(200).json({ message: "Serial port initialized successfully" });
    }
    catch (error) {
        console.error("Error initializing serial port:", error);
        res.status(500).json({ error: "Error initializing serial port" });
    }
}));
function initializeSerialPort() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ports = yield serialport_1.SerialPort.list();
            console.log(ports);
            const espPort = ports.find((port) => port.manufacturer === "Microsoft");
            console.log(espPort);
            if (!espPort) {
                console.error("Port not found.");
                return;
            }
            const portName = espPort.path;
            console.log("Port:", portName);
            const port = new serialport_1.SerialPort({ path: portName, baudRate: 9600 });
            port.on("error", (err) => {
                console.error("Error connecting to serial port:", err.message, err);
            });
            port.on("open", () => __awaiter(this, void 0, void 0, function* () {
                console.log("Serial port connected successfully");
                let dataBuffer = "";
                let bufferEnabled = true; // Assume buffer is enabled initially
                port.on("data", (data) => {
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
                                    const [timestamp, x, y, z, total] = parts.map((part) => parseFloat(part));
                                    console.log(` Timestamp: ${timestamp}, x: ${x}, y: ${y}, z: ${z}, total: ${total}`);
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
                                }
                                else {
                                    console.log(`Incomplete data line: ${line}`);
                                }
                            }
                            else {
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
            }));
        }
        catch (error) {
            console.error("Error initializing serial port:", error);
        }
    });
}
// Initialize the serial port
// initializeSerialPort();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
