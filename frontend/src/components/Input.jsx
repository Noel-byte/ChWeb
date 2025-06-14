import React from 'react';

const Input = ({ type, label, name, value, onChange}) => {
  return (
 <div className="flex flex-col gap-2 mb-4">
  <div className="flex justify-between items-center">
    <label
      htmlFor={name}
      className="text-base md:text-lg font-medium text-gray-700"
    >
      {label}:
    </label>
  
  </div>
  
  <input
    type={type}
    name={name}
    id={name}
    className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 w-full transition-all duration-200`}
    onChange={(event) => onChange(name, event.target.value)}
    value={value}
  />
  
</div>
  );
};

export default Input;
