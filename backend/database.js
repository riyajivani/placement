const mongoose = require("mongoose");

const dbURI = "mongodb+srv://riyajivani8:254222@shipmnt.mixt3dv.mongodb.net/?retryWrites=true&w=majority&appName=shipmnt";

mongoose.connect(dbURI);

const db = mongoose.connection;

db.on("error", (error) => {
     console.error("MongoDB connection error:", error);
});

db.once("open", () => {
     console.log("Connected to MongoDB");
});

module.exports = db;
