import React from 'react'

const TextArea = ({label,name,defval}) => {
  return (
      <div className="flex justify-between items-center">
              <label htmlFor="address" className='font-semibold text-lg'>{label}:</label>{' '}
              <textarea
                name={name}
                id="address"
                rows="3"
                className="bg-stone-100 outline-0 px-2 rounded"
                defaultValue={defval}
              ></textarea>
            </div>
  )
}

export default TextArea