import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import MyContext from '../components/MyContext'

const Logout = () => {
    const navigate = useNavigate()
    const {setToken,setIsAdmin} = useContext(MyContext)
    const handleLogout = (e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
         setToken(null)
         setIsAdmin(false)
        navigate('/')
    }
  return (
    <span className='text-2xl hover:cursor-pointer' onClick={handleLogout}>Logout</span>
  )
}

export default Logout