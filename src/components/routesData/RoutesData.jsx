import React, { useEffect } from "react";
import Home from "../home/Home";
import About from "../about/About";
import Blog from "../blog/Blog";
import Portpolio from "../portfolio/Portpolio";
import BlogDetails from "../blogDetails/BlogDetails";
import Form from "../form/Form";
import  Signup  from "../signup/Signup";
import Signin from "../signin/Signin";
import Createblog from "../create/Createblog";
import Hooks from "../hooks/Hooks";
import { useState } from "react";
import Cart from "../cart/Cart";


let id = 0;
export const AppRoutes = [
               {
       id : id++,
       path: '/'    ,
       component: <Home />  ,
       navName: 'Home'

    }
    ,

               {
       id : id++,
       path: '/blog'    ,
       component: <Blog />  ,
       navName: 'Blog'

      }
      ,
//                {
//        id : id++,
//        path: '/about'    ,
//        component:<About />  ,
//        navName: 'About'

//       }
      ,
//                {
//        id : id++,
//        path: '/portpolio'    ,
//        component: <Portpolio /> ,
//        navName: 'Portpolio'

//       }
      ,
               {
       id : id++,
       path: '/blog/:id'    ,
       component: <BlogDetails /> ,
       navName: 'null'

      }
      ,
               {
       id : id++,
       path: '/form'    ,
       component: <Form /> ,
       navName: 'Form'

      }
        ,  
             {
       id : id++,
       path: '/signup'    ,
       component: <Signup /> ,
       navName: 'Signup'

      }
      ,
             {
       id : id++,
       path: '/signin'    ,
       component: <Signin /> ,
       navName: 'null'

      }
      ,
             {
       id : id++,
       path: '/create'    ,
       component: <Createblog /> ,
       navName: 'null'

      },
//              {
//        id : id++,
//        path: '/hooks'    ,
//        component: <Hooks /> ,
//        navName: 'Hooks'

//       },
//              {
//        id : id++,
//        path: '/cart'    ,
//        component: <Cart /> ,
//        navName: 'Cart'

//       }
      
]


  