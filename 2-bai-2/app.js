const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const mongoUrl = process.env.MONGO_URL || "mongodb://mongodb:27017/votedb";

app.use(express.json());

const voteSchema = new mongoose.Schema(
    {
        option: { type: String, required: true },
    },
    { timestamps: true },
);

const Vote = mongoose.model("Vote", voteSchema);

app.get("/", (req, res) => {
    res.json({ message: "Node.js + MongoDB is running" });
});

app.post("/votes", async (req, res) => {
    try {
        const vote = await Vote.create({ option: req.body.option || "A" });
        res.status(201).json(vote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/votes", async (req, res) => {
    const votes = await Vote.find().sort({ createdAt: -1 }).lean();
    res.json(votes);
});

async function start() {
    await mongoose.connect(mongoUrl);
    app.listen(port, () => {
        console.log(`2-bai-2 app running on port ${port}`);
    });
}

start().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
