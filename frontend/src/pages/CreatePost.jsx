import React from 'react';
import { useContext, useEffect } from 'react';
import MyContext from '../components/MyContext';

const CreatePost = () => {
  const { setIsAdminOpen } = useContext(MyContext);

  useEffect(() => {
    setIsAdminOpen(false);
  }, [setIsAdminOpen]);
  return <h1 className="text-2xl text-center">CreatePost</h1>;
};

export default CreatePost;
