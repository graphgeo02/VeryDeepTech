// import React, { useEffect } from 'react'
// import BlogDetails from '../blogDetails/BlogDetails';
// import { useNavigate } from 'react-router-dom';
// import Blognav from '../blogNav/Blognav';
// import { useRecoilValue } from 'recoil';
// import { userInfo } from '../atom/user';

// const Blog = () => {
//   let redir = useNavigate();
//   useEffect(()=>{
//  let user = useRecoilValue(userInfo);
//  if(!user.isLoggeIn){
//   redir('/signin')
//  }
//   },[])
//  const buttonStyles={
//   backgroundColor: 'grey',
//   Color:'transparent',
//   border: 'unset',
//   borderRadius: '',
//   cusor: 'pointer',
//   padding: '10px 20px',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   marginTop: '6px'
//  }
//   return (
//     <div>
//      <Blognav />
//       <br></br>
//       <h1>Blog </h1>
//       <br></br>
//       <h2>Insights and Updates</h2>
//       <p>
//       Welcome to my blog! Here, I share my thoughts, experiences, and tips on front-end development, 
//       UI/UX design, and the latest trends in the tech world. 
//       Stay tuned for regular updates and insights that can help you in your own development journey.
//       </p>

//       <p>Recent Posts</p>
//       <br/>
//       <ol>
//         <li><a href='#'>Understanding React Hooks</a></li>
//         <ul>Dive into the world of React Hooks and learn how they can simplify your code.</ul>
      
      
      
      
//         <li><a href='#'>UI/UX Best Practice</a>
//         <ul>Discover the best practices in UI/UX design to enhance user experience</ul>
        
//       </li>
     
      
//         <li><a href='#'>Tips for Aspiring Developers</a>
//         <ul>Practical tips and advice for those looking to start a career in front-end development</ul>
//       </li>
//       </ol>
      
//       <p><a href="#">Read More</a></p>
//       <button style={buttonStyles} onClick={()=>redir("/BlogDetails")}>Blog Details</button>
//     </div>
    
//   )
// }

// export default Blog


import React, { useState } from 'react'
import Blognav from '../blogNav/Blognav'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { userInfo } from '../atom/user';
import  { useEffect } from "react";
import axios from 'axios';
import './blog.scss';

//if user is not log in redir him to signin
const Blog = () => {
let redir = useNavigate();
let user = useRecoilValue(userInfo);
let [blogs, setBlogs] = useState(null);
useEffect(()=>{
if(!user.isLoggedIn){
  redir("/signin");
}
  }, [user.isLoggedIn]);


// fetch the blog to display title, intro, author for user from back end
useEffect(()=>{
axios
// .get("http://localhost:8000/Blog")
 .get("https://jsonplaceholder.typicode.com/posts")
.then(resp=>{
  setBlogs(resp.data)
  .catch(err=>{
    console.error(err);
  })
})
},[])

  return (
    <div id="Blogs">
      <Blognav />
      <h1>All blogs</h1>
      <div className="content">
        {
          blogs && blogs.map(blog =>{
            return(
                 //onclick redir him to blog with respective id that may be blog deatail or from back end
              <div onClick={()=>redir(`/blog/${blog.id}`)} key={blog.id} className="blogs">
                 <h3>{blog.title}</h3>
                 <p>{blog.intro}</p>
                 <h6>{blog.author? blog.author: ''}</h6>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Blog