import React from 'react';
import Input from './Input';

const Spouse = () => {
  return (
    <div className="flex flex-col gap-1 transition-all duration-300 ease-in-out bg-zinc-400 py-1 px-2 rounded">
      <form action="">
        <Input type="text" label="Spouse's First Name" />
        <Input type="text" label="Spouse's Middle Name" />
        <Input type="text" label="Spouse's Last Name" />
        <button  className=" justify-start border rounded px-6 py-1 w-1/2 m-auto block bg-blue-600 text-white text-lg hover:cursor-pointer hover:bg-blue-500 mt-4
        ">Add Spouse</button>
      </form>
    </div>
  );
};

export default Spouse;
