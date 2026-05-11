const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Karpaga@2006",   // 👈 CHANGE IF YOUR PASSWORD IS DIFFERENT
  database: "resource_booking"
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Error:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

module.exports = db;

