require("dotenv").config();
let express = require("express");
let {port} = require("./src/config/env");
let db = require("./src/config/db");
const bookingRoutes = require("./src/routes/bookingRoutes");
const authRoutes = require("./src/routes/authRoutes");


let trueAir = express();
let cors = require("cors");
trueAir.use(express.json());
trueAir.use(cors());


trueAir.use("/api/bookings", bookingRoutes);
trueAir.use("/api/auth", authRoutes);



db().then(() => {
    trueAir.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }).catch((e)=>{
    console.log(e)
  })
