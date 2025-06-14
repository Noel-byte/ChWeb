import React from 'react';
import { useRef } from 'react';

const FileUpload = () => {
  const inputRef = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div>
      <label htmlFor="" className="text-md font-semibold">
        Select a file to Upload:{' '}
      </label>
      <button
        onClick={handleClick}
        className="hover:cursor-pointer border px-3 rounded bg-dark text-white py-1 font-buttons text-xl"
      >
        Browse...
      </button>
      <input
        type="file"
        className="hidden"
        accept=".xls,.xlsx"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
