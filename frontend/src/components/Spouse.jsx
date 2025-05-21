import React from 'react';
import Input from './Input';

const Spouse = () => {
  return (
    <div className="flex flex-col gap-1 transition-all duration-300 ease-in-out bg-zinc-400 py-1 px-2 rounded">
      <Input type="text" label="Spouse's First Name" />
      <Input type="text" label="Spouse's Middle Name" />
      <Input type="text" label="Spouse's Last Name" />
    </div>
  );
};

export default Spouse;
