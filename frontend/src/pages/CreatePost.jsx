import React from 'react';
import { useContext, useEffect, useState } from 'react';
import MyContext from '../components/MyContext';
import TextArea from '../components/TextArea';
import Input from '../components/Input';
import axios from 'axios'
const urllocal = `http://localhost:5000`;


const CreatePost = () => {
  const [enValues, setEnValues] = useState({ title: '', post: '' });
  const { setIsAdminOpen } = useContext(MyContext);

  const handleChange = (identifier, value) => {
    setEnValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const createPost = (e) =>{

    e.preventDefault()

    const {title,post} = enValues
    console.log(title,post)
     
    //make a post request
    axios.post(`${urllocal}/api/admin/post`,enValues)
    .then((response)=>console.log(response.data))
    .catch((error)=>console.log(error))
 
  }

  useEffect(() => {
    setIsAdminOpen(false);
  }, [setIsAdminOpen]);
  return (
    <div className="pt-45 flex flex-col items-center">
      <div className='flex flex-col gap-2 outline py-2 px-8 pb-6 rounded'>
        <h1 className='text-center text-2xl text-white'>Create a post</h1>
        <Input
          label="Title"
          name="title"
          onChange={handleChange}
          value={enValues.title}
        />
        <TextArea
          label="Create A Post: "
          name="post"
          onChange={handleChange}
          value={enValues.post}
        />
        <button className="outline px-4 py-1 rounded self-end mt-3 font-buttons bg-dark text-white text-lg hover:cursor-pointer" onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
