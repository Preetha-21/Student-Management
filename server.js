const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
    secret:'secret123',
    resave:false,
    saveUninitialized:true
}));


app.get('/', (req,res)=> res.sendFile(path.join(__dirname,'public/register.html')));
app.get('/login', (req,res)=> res.sendFile(path.join(__dirname,'public/login.html')));
app.get('/dashboard', (req,res)=> res.sendFile(path.join(__dirname,'public/dashboard.html')));

/* REGISTER */
app.post('/register',(req,res)=>{
    const {name,password,subject} = req.body;
    db.query("INSERT INTO faculty(name,password,subject) VALUES(?,?,?)",
    [name,password,subject],
    ()=> res.redirect('/login'));
});


app.post('/login',(req,res)=>{
    const {name,password} = req.body;
    db.query("SELECT * FROM faculty WHERE name=? AND password=?",
    [name,password],
    (err,result)=>{
        if(result.length>0){
            req.session.subject = result[0].subject;
            req.session.name = result[0].name;
            res.redirect('/dashboard');
        } else res.send("Invalid login. <a href='/login'>Try again</a>");
    });
});

/* LOGOUT */
app.get('/logout',(req,res)=>{
    req.session.destroy(()=> res.redirect('/login'));
});


app.get('/api/students',(req,res)=>{
    if(!req.session.subject) return res.status(401).send("Unauthorized");
    let search = req.query.search || "";
    db.query("SELECT * FROM students WHERE subject=? AND name LIKE ?",
    [req.session.subject, "%"+search+"%"],
    (err,data)=> res.json(data));
});

/* API: ADD STUDENT */
app.post('/api/students',(req,res)=>{
    if(!req.session.subject) return res.status(401).send("Unauthorized");
    const {rollno,name,marks} = req.body;
    db.query("INSERT INTO students(rollno,name,marks,subject) VALUES(?,?,?,?)",
    [rollno,name,marks,req.session.subject],
    ()=> res.send({status:"success"}));
});

/* API: DELETE STUDENT */
app.delete('/api/students/:id',(req,res)=>{
    if(!req.session.subject) return res.status(401).send("Unauthorized");
    db.query("DELETE FROM students WHERE id=?",[req.params.id],
    ()=> res.send({status:"deleted"}));
});

/* API: UPDATE STUDENT */
app.put('/api/students/:id',(req,res)=>{
    if(!req.session.subject) return res.status(401).send("Unauthorized");
    const {rollno,name,marks} = req.body;
    db.query("UPDATE students SET rollno=?, name=?, marks=? WHERE id=?",
    [rollno,name,marks,req.params.id],
    ()=> res.send({status:"updated"}));
});

app.listen(3000,()=> console.log("Server running on port 3000"));
