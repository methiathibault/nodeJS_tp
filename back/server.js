const express = require("express");
let cors = require('cors');
const app = express();
const pool = require('./data.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

app.get('/users/', async(req,res) => {
    console.log("get all user")
    let conn;
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT * FROM users ;")
        conn.release();
        res.status(200).json(rows)
    }catch(err){
        console.log(err)
    }
})

app.get('/users/:id', async(req,res) => {
    
    let id = parseInt(req.params.id)
    
    let conn;
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT * FROM users WHERE id=? ;",[id])
        conn.release();
        res.status(200).json(rows)
    }catch(err){
        console.log(err)
    }
})

app.post('/users/', async(req,res) => {


    let conn;
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("INSERT INTO users (username, password) VALUES (?,?);",[req.body.username,req.body.password])
        conn.release()
        res.status(200).json("add user ok")
    }catch(err){
        console.log(err)
    }
})

 app.put('/users/username/:id', async(req,res) => {
    let id = parseInt(req.params.id)
    let conn;
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("UPDATE users SET username = ? WHERE id = ?;",[req.body.username,id])
        conn.release();
        res.status(200).json("username modif ok")
    }catch(err){
        console.log(err)
    }
 })

 app.put('/users/password/:id', async(req,res) => {
    let id = parseInt(req.params.id)
    let conn;
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("UPDATE users SET password = ? WHERE id = ?;",[req.body.password,id])
        conn.release();
        res.status(200).json("modif password ok")
    }catch(err){
        console.log(err)
    }
 })

 app.put('/users/:id', async(req,res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "UPDATE users SET username = ?, password = ? WHERE id = ?",
            [req.body.username, req.body.password, req.params.id]
        );
        res.status(200).json("user updated successfully");
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


app.delete('/users/:id', async(req,res) => {
    let id = parseInt(req.params.id)
    let conn;
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("DELETE FROM users  WHERE id = ?;",[id])
        conn.release();
        res.status(200).json("remove user ok")
    }catch(err){
        console.log(err)
    }
})

app.get("/products/", authenticator, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM products");
        res.status(200).json(rows);
        conn.release();
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.get("/products/:id", authenticator, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT * FROM products WHERE id = ?", req.params.id
        );
        res.status(200).json(rows);
        conn.release();
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.post("/products/", authenticator, async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        req.body.forEach(async (element) => {
        await conn.query(
            "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
            [element.name, element.price, element.description]
        );
    });
    conn.release()
        res.status(200).json("Product added successfully");
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.put('/products/:id', authenticator, async(req,res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
            [req.body.name, req.body.price, req.body.description, req.params.id]
        );
        res.status(200).json("Product updated successfully");
        conn.release()
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

app.delete("/products/:id", authenticator, async (req, res) => {
    let conn;
    const id = parseInt(req.params.id);
    try {
        conn = await pool.getConnection();
        await conn.query(
            "DELETE FROM products WHERE id = ?", id
        );
        res.status(200).json("Product deleted successfully");
        conn.release()
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.post("/register", async(req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
        if (result[0]) {
            return res.status(400).json({ error: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const insertValues = [username, hashedPassword];
        await conn.query(insertQuery, insertValues);
        conn.release();

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch(err) {
        res.status(500).json({ error: err });
    }
})

app.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;
        const conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
        if (result.lenght === 0) {
            res.status(400).json({ error: "User does not exist"});
        }
        conn.release();
        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: "Invalid password"})
        }
        const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "1h"})
        res.status(200).json({token})
    } catch(err) {
        res.status(500).json({ error: err })
    }
})

function authenticator(req, res, next) {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).json({ error: "Access Denied" });
            }
            else {
                next();
            }
        })
    } else {
        res.status(401).json({ error: "Access Denied" });
    }
};

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
