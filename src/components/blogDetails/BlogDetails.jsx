import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import global from "../globalCss/global.module.css";
import { useParams } from 'react-router-dom';
import Blog from '../blog/Blog';
import { useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from '../confirmModal/ConfirmModal'; 
import UpdateBlog from '../update/UpdateBlog';
import Blognav from '../blogNav/Blognav';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../atom/user';




const BlogDetails = () => {
  let {id} = useParams();
  let redir = useNavigate();
  let [blog, setBlog] = useState(null);
  let [showModal, setShowModal] = useState(null);
  let [toggle, setToggle] = useState(false);
  let user  = useRecoilValue(userInfo);
  const notify = (a) => toast(a,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      }




  );
  const dismissAll = () =>  toast.dismiss();
// fetch the blog from back end title, contrent, author this time
  useEffect(()=>{
    axios
    // .get("http://localhost:8000/Blog/" + id)
     .get("https://jsonplaceholder.typicode.com/posts/" + id)
    .then(resp=>{
      setBlog(resp.data)
      .catch(err=>{
        console.error(err);
      })
    })
    },[])
function handleDelete(){
  notify('Deleting...')
  setTimeout(() => {
   
    
    axios
    // .delete("http://localhost:8000/Blog/" + id)
     .delete("https://jsonplaceholder.typicode.com/posts/" + id)
    .then(resp=>{
      dismissAll()
      notify('Blog Deleted Successfully...');
     setTimeout(()=>{
          redir("/blog")
     }, 1000* 5)
    }
    ).catch(err=>{
      console.error(err)
    })
  }, 1000 * 3);
  console.log("blog deleted")
}

  return (
    <>
    {
      !toggle && 
      <div align="center" style={{marginTop: "2rem"}}>
      { 
        blog && 
        <>
        <h2>{blog.title} </h2>  
        <p>{blog.body}</p>
        <h6>{blog.author? blog.author: ''}</h6>
        </>
      }
      <div className='btns'>
            <button onClick={()=>redir('/blog')}>Back</button>
            {
              user.data.role === "admin" && (
                <>
             <button onClick={()=>setShowModal(true)} >Delete</button>
             <button onClick={()=> setToggle(true)}>Update</button>
                </>
              )
            }
           
      </div> 
      <ConfirmModal 
              action={handleDelete}
              msg={'Sure you want delete this blog post?'}
              setShowModal={setShowModal}
              showModal={showModal}
              actionProps={{ a: id}}
      />   
              <ToastContainer />  
    </div>
    }
    {
      toggle && < UpdateBlog  setToggle={setToggle} data={blog && blog} />
    }
    </>
  );
};

export default BlogDetails






