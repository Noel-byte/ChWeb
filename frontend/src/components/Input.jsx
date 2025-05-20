import React from 'react';

const Input = ({ type, label,name }) => {
  return (
    <div className=" flex justify-between items-center py-2">
      <label htmlFor="" className=" text-lg font-semibold">
        {label}:
      </label>
      <input type={type} name={name} className=" bg-white px-2 rounded outline-0 py-1 ml-1" />
    </div>
  );
};

export default Input;
