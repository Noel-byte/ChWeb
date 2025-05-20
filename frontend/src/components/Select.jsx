import React from 'react'

const Select = ({label,options,onChange,value,name}) => {
  return (
    <div className=' flex justify-between'>
    <label htmlFor="" className=' font-semibold text-lg'>{label}:</label>
    <select name={name} id="" className=' border px-4 py-1 rounded' onChange={onChange} value={value}>
    {options.map((item,index)=>{
      
       return <option key={index} value={item} >{item}</option>
    })}
   </select>
    </div>
   
  )
}

export default Select