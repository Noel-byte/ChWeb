import React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import MyContext from '../components/MyContext';
import axios from 'axios';
const urllocal = `http://localhost:5000`;

const HomePage = () => {
  const [posts, setPosts] = useState([]);
   const {token,isAdmin} = useContext(MyContext)
 
  useEffect(() => {
    //make a get request to the post
    axios
      .get(`${urllocal}/api/members/getPost`)
      .then((response) => setPosts(response.data.posts))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="pt-48 flex flex-col items-center ">
      <h1 className="text-white text-3xl pb-3 font-titles">
        Community Messages
      </h1>
      <div className="flex gap-3 flex-wrap justify-center ">
        {[...posts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

          .map((post, index) => (
            <div
              className=" rounded outline py-2 px-6 shadow-lg w-90 break-words bg-white text-gray-800 "
              key={index}
            >
              <h1 className="flex items-center gap-2 justify-between">
                <span className=" first-letter:uppercase text-2xl font-titles">
                  {post.title}
                </span>

                {index === 0 && (
                  <span className="bg-green-500 text-white text-sm px-4 py-0.5 rounded font-title">
                    NEW
                  </span>
                )}
              </h1>
              <div className="font-text pt-2 text-xl">
                <p className=" first-letter:uppercase">{post.post}</p>
                <span className="font-mono text-gray-400 block pt-3">
                  Posted: {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              {(token&&isAdmin)&&(<div className="flex justify-center gap-4 items-center pt-5 ">
                <button className=' flex-1 border  px-4 py-1 rounded-lg bg-dark text-white font-buttons hover:cursor-pointer shadow-lg'>Edit</button>
                <button className='flex-1 border  px-4 py-1 rounded-lg bg-red-600 text-white font-buttons hover:cursor-pointer shadow-lg'>Delete</button>
              </div>)}
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
