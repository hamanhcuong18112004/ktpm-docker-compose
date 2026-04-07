const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello from Bai 4 Express + Docker Compose!");
});

app.listen(port, () => {
    console.log(`Bai 4 app is running on port ${port}`);
});
