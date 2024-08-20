import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState("")
    const [newUserPass, setNewUserPass] = useState("")

    function changeUsername (){

    }

    function changePassword(){

    }

    function removeUser(){

    }
    
    function addUser(){

    }

    useEffect(()=>{
        axios.get("http://localhost:8000/users/")
        .then(res => setUsers(res.data))
        .catch(err=> console.log(err))
    },[])

  return (
    <div>
      <div>UserPage</div>

      <div>
        {users.map((element) =>(

          <div>
             <input value={element.username} onChange={(e)=> changeUsername(e.target.value)}/>  -  <input value={element.username} onChange={(e)=> changeUsername(e.target.value)}/>  <button onClick={()=> removeUser()}> delete </button>
          </div>
        ))}

          <div>
             ajout
             <input onChange={(e)=> setNewUserName(e.target.value)}/>  -  <input onChange={(e)=> setNewUserPass(e.target.value)}/>  <button onClick={()=>addUser()}> ajout </button>
          </div>
      </div>
    </div>
  )
}
