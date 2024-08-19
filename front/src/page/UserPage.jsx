import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function UserPage() {
    useState[users, setUsers] = useState();


    useEffect(()=>{
        axios.get("http://localhost:8000/users")
        .then(res => setUsers(res.data))
        .catch(err=> console.log(err))
    },[])

  return (
    <div>UserPage</div>
  )
}
