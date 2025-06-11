import React from 'react'

const TextArea = ({label,name,value,onChange}) => {
  return (
      <div className="flex justify-between items-center">
              <label htmlFor="address" className='font-semibold text-lg'>{label}:</label>{' '}
              <textarea
                name={name}
                id="address"
                rows="3"
                className="bg-stone-50 outline px-2 rounded"
                defaultValue={value}
                onChange={(event)=>onChange(name,event.target.value)}
              ></textarea>
            </div>
  )
}

export default TextArea