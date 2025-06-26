import React from 'react';
import { useEffect, useState } from 'react';
import { useContext, useCallback } from 'react';
import MyContext from '../components/MyContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import BlogEditor from '../components/BlogEditor';
import { Toaster, toast } from 'react-hot-toast';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const { isLoggedIn, isAdmin, content, setContent } = useContext(MyContext);
  const { t } = useTranslation();
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit' };

  const handleChange = useCallback((newValue) => {
    setContent(newValue);
  }, []);

  useEffect(() => {
  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
}, []);

  const getPosts = () => {
    toast.loading('Posts loading Please wait...');
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/members/getPost`)
      .then((response) => {
        const data = response.data;
        const safePosts = Array.isArray(data.posts) ? data.posts : [];
        setPosts(safePosts);
        toast.dismiss();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //make a get request to the post
    getPosts();
  }, []);

  const handleEdit = (postId, postContent) => {
    setEditPostId(postId);
    setContent(postContent);
  };

  const handleSave = (postId) => {
    axios
      .put(`${import.meta.env.VITE_API_BASE_URL}/api/admin/posts/${postId}`, {
        content: content,
      })
      .then(() => {
        //set back edit post id to null
        setEditPostId(null);
        //refetch the posts
        getPosts();
      })
      .catch((error) => console.log(error));

    //make an axios update request
  };

  const handleDelete = (postId) => {
    //make an axios delete request to delete the post
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/posts/${postId}`)
      .then(() => {
        //  refetch the posts
        getPosts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {posts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No posts found.
          </div>
        )}
        {[...posts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post, index) => (
            <div
              key={post._id || index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Card header with NEW badge */}
              <div className="relative bg-gray-100 px-4 py-2 border-b border-gray-200">
                <div className="text-right">
                  {index === 0 && (
                    <span className="bg-green-500 text-white text-xs md:text-sm px-3 py-1 rounded-full font-bold">
                      {t('new')}
                    </span>
                  )}
                </div>
              </div>

              {/* Post content */}
              <div className="p-5">
                <div className="prose prose-sm max-w-none break-words text-gray-800">
                  {editPostId !== post._id ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    <BlogEditor handleChange={handleChange} value={content} />
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-gray-500 text-sm font-mono">
                    <span className="text-blue-400">Posted on</span>{' '}
                    {new Date(post.createdAt).toLocaleDateString(
                      'en-US',
                      optionsDate
                    )}{' '}
                    <span className="text-blue-400">at</span>{' '}
                    {new Date(post.createdAt).toLocaleTimeString(
                      'en-US',
                      optionsTime
                    )}
                  </span>
                </div>
              </div>

              {/* Admin actions */}
              {isLoggedIn && isAdmin && (
                <div className="px-5 pb-5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {editPostId !== post._id ? (
                      <button
                        onClick={() => handleEdit(post._id, post.content)}
                        className="flex-1 bg-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:cursor-pointer"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSave(post._id)}
                        className="flex-1 bg-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:cursor-pointer"
                      >
                        Save
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
