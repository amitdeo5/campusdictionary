// import app file from app
const app = require("./app.js");
const cors=require("cors");
const connectDatabase = require("./config/database");
// Using custom environment file
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// connecting database
connectDatabase();
app.use(cors());
// Server start listening at PORT
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

