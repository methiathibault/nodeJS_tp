const express = require('express');
const app = express();
const pool = require('./data');

app.use(express.json());

app.get('/users/', async((req,res) => {

}))

app.get('/users/:id', async((req,res) => {

}))

app.post('/users/', async((req,res) => {

}))

app.put('/users/:id', async((req,res) => {

}))

app.delete('/users/:id', async((req,res) => {

}))

app.get('/products/', async((req,res) => {

}))

app.get('/products/:id', async((req,res) => {

}))

app.post('/products/', async((req,res) => {

}))

app.put('/products/:id', async((req,res) => {

}))

app.delete('/products/:id', async((req,res) => {

}))

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})
