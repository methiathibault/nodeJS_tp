import {React, useState, useEffect} from 'react'
import axios from 'axios'


export default function ProductPage() {
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: ""
    })


    function getAllProducts(){
        axios.get("http://localhost:8000/products/")
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
    }

    function deleteProduct(id){
        axios.delete(`http://localhost:8000/products/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setProducts(products.filter(product => product.id !== id))
    }

    function addProduct(){
        axios.post("http://localhost:8000/products/", [newProduct])
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setProducts([...products, newProduct])
    }

    function updateProduct(id){
        axios.put(`http://localhost:8000/products/${id}`, newProduct)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setProducts(products.map(product => product.id === id ? newProduct : product))
    }
    
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div>
            <h1>Product Page</h1>
                <div>
                    {products.map((product) => (
                        <div key={product.id}>
                            <p className='product'>
                                {product.name} - {product.price} - {product.description}
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>

                            </p>
                            <p className='update-product'>
                                <input type="text" placeholder="name" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                                <input type="text" placeholder="price" onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>
                                <input type="text" placeholder="description" onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}/>
                                <button onClick={() => updateProduct(product.id)}>Update</button>
                            </p>
                        </div>
                    ))}
                <p className='add-product'>
                    <h2>Add Product</h2>
                    <input type="text" placeholder="name" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                    <input type="text" placeholder="price" onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>
                    <input type="text" placeholder="description" onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}/>
                    <button onClick={addProduct}>Add</button>
                </p>
                </div>
        </div>
    )
}
