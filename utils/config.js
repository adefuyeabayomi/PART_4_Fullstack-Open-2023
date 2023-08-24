require("dotenv").config();
let DB_URL = process.env.DB_URL;
let PORT = process.env.PORT;
module.exports = {
    DB_URL, PORT
}