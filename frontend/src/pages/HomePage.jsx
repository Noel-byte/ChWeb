import React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import MyContext from '../components/MyContext';
import axios from 'axios';
// const urlremote = `http://localhost:5000`;
const urlremote = `https://faithbridge.onrender.com`

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { token, isAdmin } = useContext(MyContext);

  useEffect(() => {
    //make a get request to the post
    axios
      .get(`${urlremote}/api/members/getPost`)
      .then((response) => setPosts(response.data.posts))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="px-4">
  {/* <h1 className="text-white text-2xl md:text-3xl font-titles text-center mb-8">
    መልአኽትታት ናብ ማሕበረ ክርስትያን ቅዱስ ቁርባን
  </h1> */}
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
    {[...posts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((post, index) => (
        <div 
          key={post.id || index}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
          {/* Card header with NEW badge */}
          <div className="relative bg-gray-100 px-4 py-2 border-b border-gray-200">
            <div className="text-right">
              {index === 0 && (
                <span className="bg-green-500 text-white text-xs md:text-sm px-3 py-1 rounded-full font-bold">
                  NEW
                </span>
              )}
            </div>
          </div>
          
          {/* Post content */}
          <div className="p-5">
            <div className="prose prose-sm max-w-none break-words text-gray-800">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-gray-500 text-sm font-mono">
                Posted: {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {/* Admin actions */}
          {token && isAdmin && (
            <div className="px-5 pb-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Edit
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
  </div>
</div>
    // <div className="pt-48 flex flex-col items-center">
    //   <h1 className="text-white text-3xl pb-3 font-titles">
    
    //     መልአኽትታት ናብ ማሕበረ ክርስትያን ቅዱስ ቁርባን
    //   </h1>
    //   <div className="flex gap-3 flex-wrap justify-center  items-baseline">
    //     {[...posts]
    //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    //       .map((post, index) => (
    //         <div
    //           className=" rounded outline py-2 px-6 shadow-lg w-auto break-words bg-white text-gray-800 "
    //           key={index}
    //         >
    //           <h1 className='text-right'>
    //             {index === 0 && (
    //               <span className="bg-green-500 text-white text-sm px-4 py-0.5 rounded font-title">
    //                 NEW
    //               </span>
    //             )}
    //           </h1>
    //           <div className="font-text pt-2 text-xl">
    //             {/* <p className=" first-letter:uppercase">{post.content}</p> */}
    //             <div className="my-rich-content">
    //               <div dangerouslySetInnerHTML={{ __html: post.content }}/>
    //             </div>

    //             <span className="font-mono text-gray-400 block pt-3">
    //               Posted: {new Date(post.createdAt).toLocaleDateString()}
    //             </span>
    //           </div>
    //           {token && isAdmin && (
    //             <div className="flex justify-center gap-4 items-center pt-5 ">
    //               <button className=" flex-1 border  px-4 py-1 rounded-lg bg-dark text-white font-buttons hover:cursor-pointer shadow-lg">
    //                 Edit
    //               </button>
    //               <button className="flex-1 border  px-4 py-1 rounded-lg bg-red-600 text-white font-buttons hover:cursor-pointer shadow-lg">
    //                 Delete
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //   </div>
    // </div>
  );
};

export default HomePage;
