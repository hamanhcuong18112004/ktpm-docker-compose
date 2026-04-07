const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const dbConfig = {
    host: "db",
    user: "user",
    password: "password",
    database: "mydb",
};

let pool;

async function waitForDatabase(retries = 20, delayMs = 3000) {
    for (let i = 1; i <= retries; i += 1) {
        try {
            pool = mysql.createPool(dbConfig);
            await pool.query("SELECT 1");
            console.log("Connected to MySQL");
            return;
        } catch (error) {
            console.log(`Waiting for MySQL... (${i}/${retries})`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    throw new Error("Cannot connect to MySQL after multiple retries");
}

app.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT NOW() AS server_time");
        res.json({
            message: "Node.js connected to MySQL successfully",
            server_time: rows[0].server_time,
        });
    } catch (error) {
        res.status(500).json({
            message: "Query failed",
            error: error.message,
        });
    }
});

waitForDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Bai 8 app is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
