const express = require('express');
const app = express();
const pool = require('./data.js');

app.use(express.json());

app.get('/users/', async(req,res) => {
    let conn;
    try{
        console.log("stat")
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT * FROM users ;")
        console.log(rows)
        res.status(200).json(rows)
    }catch(err){
        console.log(err)
    }
})

app.get('/users/:id', async(req,res) => {
    
    let id = parseInt(req.params.id)
    
    let conn;
    try{
        console.log("stat")
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT * FROM users WHERE id=? ;",[id])
        console.log(rows)
        res.status(200).json(rows)
    }catch(err){
        console.log(err)
    }
})

app.post('/users/', async(req,res) => {


    let conn;
    try{
        console.log("stat")
        conn = await pool.getConnection()
        const rows = await conn.query("INSERT INTO users (username, password) VALUES (?,?);",[req.body.username,req.body.password])
        console.log(rows)
        res.status(200).json(req.body)
    }catch(err){
        console.log(err)
    }
})

 app.put('/users/username/:id', async(req,res) => {
    let id = parseInt(req.params.id)
    let conn;
    try{
        console.log("stat")
        conn = await pool.getConnection()
        const rows = await conn.query("UPDATE users SET username = ? WHERE id = ?;",[req.body.username,id])
        console.log(rows)
        res.status(200).json(rows)
    }catch(err){
        console.log(err)
    }
 })

 app.put('/users/password/:id', async(req,res) => {
    let id = parseInt(req.params.id)
    let conn;
    try{
        console.log("stat")
        conn = await pool.getConnection()
        const rows = await conn.query("UPDATE users SET password = ? WHERE id = ?;",[req.body.password,id])
        console.log(rows)
        res.status(200).json("la modification a bien été effectué")
    }catch(err){
        console.log(err)
    }
 })

app.delete('/users/:id', async(req,res) => {
    let id = parseInt(req.params.id)
    let conn;
    try{
        console.log("stat")
        conn = await pool.getConnection()
        const rows = await conn.query("DELETE FROM users  WHERE id = ?;",[id])
        console.log(rows)
        res.status(200).json("la suppression a bien été effectué")
    }catch(err){
        console.log(err)
    }
})

// app.get('/products/', async((req,res) => {

// }))

// app.get('/products/:id', async((req,res) => {

// }))

// app.post('/products/', async((req,res) => {

// }))

// app.put('/products/:id', async((req,res) => {

// }))

// app.delete('/products/:id', async((req,res) => {

// }))

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})
