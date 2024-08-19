const express = require("express");
const app = express();
const pool = require("./data.js");

app.use(express.json());

// app.get('/users/', async((req,res) => {

// }))

// app.get('/users/:id', async((req,res) => {

// }))

// app.post('/users/', async((req,res) => {

// }))

// app.put('/users/:id', async((req,res) => {

// }))

// app.delete('/users/:id', async((req,res) => {

// }))

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
