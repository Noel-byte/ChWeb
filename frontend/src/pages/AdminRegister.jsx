import React from 'react';
import { useState,useContext } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import MyContext from '../components/MyContext';



const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    name: '',
    password: '',
  });
  const {setAdminToken} = useContext(MyContext)
  const [isFocused,setIsFocused] = useState()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();

    //get the value and  velidate 
    const uname = admin.name;
    const upass = admin.password;
    if (!uname || !upass) {
       return;
    }

    const user ={username:uname,password:upass}

    //send the  values to the database
     axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`,user)
     .then((response)=>{
      localStorage.setItem('admintoken',response.data.token)
      setAdminToken(localStorage.getItem('admintoken'))
      navigate('/')
      
     }).catch((error)=>{
      console.log(error)
     })
  };
  return (
    <div className=" w-1/2 m-auto py-2">
      <form className="flex flex-col items-center justify-center space-y-3 py-6  shadow-lg bg-stone-300">
        <div className="flex gap-1">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            className="outline-0 border px-3 py-1 rounded"
            onChange={(e) =>
              setAdmin((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            value={admin.name}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
          />
        </div>
        {(admin.name === ''&&isFocused) && (
          <span className="text-red-600 font-text  ml-10">username cannot be empty</span>
        )}
        <div className="flex gap-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="outline-0 border px-3 py-1 rounded"
            onChange={(e) =>
              setAdmin((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            value={admin.password}
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
          />
        </div>
        {(admin.password === ''&&isFocused) && (
          <span className="text-red-600 font-text ml-10">password cannot be empty</span>
        )}
        <button
          onClick={handleClick}
          className=" border  px-10 py-1.5 rounded font-buttons bg-button text-white hover:cursor-pointer hover:bg-button/95"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
