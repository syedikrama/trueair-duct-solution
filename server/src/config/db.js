// let mongoose = require('mongoose');
// let { mongo_url } = require("./env");

// let db_work = async function(){
//     try {
//         await mongoose.connect(mongo_url);
//         console.log("Connected to MongoDB");
//     } catch (e) {
//         console.log("Error connecting to MongoDB:", e);
//     }
// }

// module.exports = db_work;


let mongoose = require('mongoose');
let { mongo_url } = require("./env");

let db_work = async function(){
    try {
        await mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (e) {
        console.log("❌ Error connecting to MongoDB:", e.message);
    }
}

module.exports = db_work;
