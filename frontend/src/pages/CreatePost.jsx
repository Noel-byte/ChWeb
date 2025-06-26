import React from 'react';
import { useContext, useEffect, useCallback } from 'react';
import MyContext from '../components/MyContext';
import BlogEditor from '../components/BlogEditor';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../i18n';

const CreatePost = () => {
  const { setIsAdminOpen, content, setContent } = useContext(MyContext);
  const { t } = useTranslation();
 


  const handleChange = useCallback((newValue) => {

    setContent(newValue);
  }, []);

  const createPost = () => {


    //make a post request
    axios
      .post(`/api/admin/post`, { content })
      .then((response) => {
        console.log(response.data.message);
        setContent('');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsAdminOpen(false);
  }, [setIsAdminOpen]);
  return (
    <div className="pb-10 px-4 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-xl border border-gray-200 shadow-lg p-6 md:p-8">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {t('post')}
        </h1>

        <div className="mb-6">
          <BlogEditor handleChange={handleChange} value={content} />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
          <button
            onClick={createPost}
            className={`px-6 py-3 rounded-lg font-bold text-white transition-all hover:cursor-pointer duration-300 min-w-[150px] ${'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg transform hover:scale-[1.02]'}`}
          >
            {t('submitpost')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
