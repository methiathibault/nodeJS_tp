import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'

export default function LoginPage(){
    const [username, SetUsername] = useState();
    const [password, SetPassword] = useState();


    function Register() {
        axios.post('http://localhost:8000/login', {
            username: username,
            password: password
        })
            .then(res => Cookie.set('cookie',res.data.token))
            .catch(err => console.log(err))
    }


    return(
        <div>
            <h1>Login</h1>
            <div>
                <p>Username: </p>
                <input type='text' onChange={e => SetUsername(e.target.value)} />
            </div>
            <div>
                <p>Password :</p>
                <input type='password' onChange={e => SetPassword(e.target.value)}/>
            </div>
            <div><button onClick={Register}>Register</button></div>
        </div>
    )
}