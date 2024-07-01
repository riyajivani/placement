const mongoose = require("mongoose")

const db = mongoose.connect("mongodb+srv://riyajivani8:Reeaa@198@shipmnt.mixt3dv.mongodb.net/?retryWrites=true&w=majority&appName=shipmnt",
     { socketTimeoutMS: 0 })
     .catch((err) => { console.log(err) }
     );

module.exports = db;