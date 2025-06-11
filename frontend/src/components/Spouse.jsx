import React from 'react';
import Input from './Input';

const Spouse = ({sp,onChange,firstnameset,lastnameset,middlenameset}) => {
  console.log(sp)
  const  {fn,mn,ln} = sp||{}
  return (
    <div className="flex flex-col gap-1 transition-all duration-300 ease-in-out bg-zinc-400 py-1 px-2 rounded">
      <Input type="text" label="Spouse's First Name" name='spouseFirstName' value={fn} onChange={onChange}/>
      {!firstnameset && (
              <p className="text-red-500 text-right">
              provide spouse first name.
              </p>
            )}
      <Input type="text" label="Spouse's Middle Name" name='spouseMiddleName' value={mn} onChange={onChange}/>
        {!middlenameset && (
              <p className="text-red-500 text-right">
              provide spouse middle name.
              </p>
            )}
      <Input type="text" label="Spouse's Last Name" name='spouseLastName' value={ln} onChange={onChange}/>
        {!lastnameset && (
              <p className="text-red-500 text-right">
              provide spouse last name.
              </p>
            )}
    </div>
  );
};

export default Spouse;
