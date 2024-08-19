const express = require("express");
let cors = require('cors');
const app = express();
const pool = require('./data.js');

app.use(express.json());
app.use(cors());

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
        res.status(200).json("add user ok")
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
        res.status(200).json("username modif ok")
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
        res.status(200).json("modif password ok")
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
        res.status(200).json("remove user ok")
    }catch(err){
        console.log(err)
    }
})

app.get("/products/", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM products");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/products/:id", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT * FROM products WHERE id = " + req.params.id
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.post("/products/", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        req.body.forEach(async (element) => {
        await conn.query(
            "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
            [element.name, element.price, element.description]
        );
    });
        res.status(200).json("Product added successfully");
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.put('/products/:id', async(req,res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
            [req.body.name, req.body.price, req.body.description, req.params.id]
        );
        res.status(200).json("Product updated successfully");
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

app.delete("/products/:id", async (req, res) => {
    let conn;
    const id = parseInt(req.params.id);
    try {
        conn = await pool.getConnection();
        await conn.query(
            "DELETE FROM products WHERE id = ?", id
        );
        res.status(200).json("Product deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
