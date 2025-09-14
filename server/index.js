require("dotenv").config();
let express = require("express");
let { port } = require("./src/config/env");
let db = require("./src/config/db");
let bookingRoutes = require("./src/routes/bookingRoutes");
let authRoutes = require("./src/routes/authRoutes");
let serviceRoutes = require("./src/routes/serviceRoutes");


let trueAir = express();
let cors = require("cors");
trueAir.use(express.json());
trueAir.use(cors());


trueAir.use("/api/bookings", bookingRoutes);
trueAir.use("/api/auth", authRoutes);
trueAir.use("/api/services", serviceRoutes);




db().then(() => {
  trueAir.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((e) => {
  console.log(e)
})


// module.exports = db;