const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Password', // put your MySQL password
    database:'studentdb'
});

db.connect(err=>{
    if(err) console.log(err);
    else console.log("MySQL Connected");
});

module.exports=db;
