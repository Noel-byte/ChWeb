import React from 'react';

const Input = ({ type, label,name,value,onChange }) => {
  return (
    <div className=" flex justify-between items-center py-2">
      <label htmlFor="" className=" text-lg font-semibold">
        {label}:
      </label>
      <input type={type} name={name} className=" bg-stone-50 px-2 rounded outline py-1 ml-1"
      onChange={(event)=>onChange(name,event.target.value)} 
      value={value}
      />
    </div>
  );
};

export default Input;
