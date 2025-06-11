import React from 'react'

const Select = ({label,options,onChange,value,name}) => {

  const selectId = `select-${name}`
  return (
    <div className=' flex justify-between'>
    <label htmlFor={selectId} className=' font-semibold text-lg'>{label}:</label>
    <select name={name} id={selectId} className=' border px-4 py-1 rounded bg-stone-50' onChange={(event)=>onChange(name,event.target.value)} value={value}>
      <option value="">-- Select --</option>
    {options.map((item,index)=>{
      
       return <option key={index} value={item} >{item}</option>
    })}
   </select>
    </div>
   
  )
}

export default Select