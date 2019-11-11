const express = require('express');
const mysql = require('mysql');
const app = express();

//Create Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysqli'
});

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Mysql Connected...');
});

//Create Database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql2';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database Created...');
    });
});

//Create Table
app.get('/createtable', (req, res) => {
    let sql = "CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table Created...');
    });
});

//Insert data
app.get('/addpost', (req, res) => {
    let post = {title:'Post five', body:'This is post number five'};
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Inserted...');
    });
});

//Select data
app.get('/getpost', (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts Fetched...');
    });
});

//Select single data
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post Fetched...');
    });
});

//Update data
app.get('/updatepost/:id', (req, res) => {
    let newBody = 'This is post number ' + req.params.id;
    let sql = `UPDATE posts SET body = '${newBody}' WHERE id = '${req.params.id}'`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post Updated...');
    });
});

//Delete data
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = '${req.params.id}'`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post Deleted...');
    });
});

//Delete Database
app.get('/dropdb', (req, res) => {
    let sql = 'DROP DATABASE nodemysql2';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database Deleted...');
    });
});

app.listen('8080', () => {
    console.log('Server Started On Port 8080');
});