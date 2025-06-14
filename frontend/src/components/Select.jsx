import React from 'react'

const Select = ({label,options,onChange,value,name}) => {

  const selectId = `select-${name}`
  return (
<div className="flex flex-col gap-2 mb-4">
  <label 
    htmlFor={selectId} 
    className="font-medium text-gray-700 text-base md:text-lg"
  >
    {label}:
  </label>
  
  <div className="relative">
    <select
      name={name}
      id={selectId}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 appearance-none"
      onChange={(event) => onChange(name, event.target.value)}
      value={value}
    >
      <option value="">-- Select --</option>
      {options.map((item, index) => (
        <option key={index} value={item}>{item}</option>
      ))}
    </select>
    
    {/* Dropdown icon */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
      <svg 
        className="h-5 w-5 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 9l-7 7-7-7" 
        />
      </svg>
    </div>
  </div>
</div>
   
  )
}

export default Select