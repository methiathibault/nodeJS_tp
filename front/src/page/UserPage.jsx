import {React, useState, useEffect} from 'react'
import axios from 'axios'


export default function UserPage() {
    const [users, setUser] = useState([])
    const [newUsers, setNewUser] = useState({
        username: "",
        password: "",
       
    })


    function getAllProducts(){
        axios.get("http://localhost:8000/users/")
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }

    function deleteProduct(id){
        axios.delete(`http://localhost:8000/users/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setUser(users.filter(user => user.id !== id))
    }

    function addProduct(){
        axios.post("http://localhost:8000/users/", [newUsers])
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setUser([...users, newUsers])
    }

    function updateProduct(id){
        axios.put(`http://localhost:8000/users/${id}`, newUsers)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setUser(users.map(user => user.id === id ? newUsers : user))
    }
    
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div>
            <h1>Users Page</h1>
                <div>
                    {users.map((user) => (
                        <div key={user.id}>
                            <p className='product'>
                                {user.username} - {user.password} 
                                <button onClick={() => deleteProduct(user.id)}>Delete</button>

                            </p>
                            <p className='update-product'>
                                <input type="text" placeholder="username" onChange={(e) => setNewUser({...newUsers, username: e.target.value})}/>
                                <input type="text" placeholder="password" onChange={(e) => setNewUser({...newUsers, password: e.target.value})}/>
                                <button onClick={() => updateProduct(user.id)}>Update</button>
                            </p>
                        </div>
                    ))}
                <p className='add-product'>
                    <h2>Add User</h2>
                    <input type="text" placeholder="username" onChange={(e) => setNewUser({...newUsers, username: e.target.value})}/>
                    <input type="text" placeholder="password" onChange={(e) => setNewUser({...newUsers, password: e.target.value})}/>
                    <button onClick={addProduct}>Add</button>
                </p>
                </div>
        </div>
    )
}
