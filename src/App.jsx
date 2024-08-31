
import './App.css'
import {  Routes, Route, useLocation } from "react-router-dom";
import { AppRoutes } from './components/routesData/RoutesData';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer'
import BlogDetails from './components/blogDetails/BlogDetails';
import Home from './components/home/Home';
import About from './components/about/About';
import Portpolio from './components/portfolio/Portpolio';
import Blog from './components/blog/Blog';
import Form from './components/form/Form';
import { useState } from 'react';
//js
function App() {
  let Path = useLocation();
  let noNav = ['/blog', '/signin','/signup','/create'];  // remove old nav from this new component, we later update with blogNav
  let [cart, setCart] = useState(0);
  return (
<div>
   
  {/*Roter step 2*/}
  
 { !noNav.includes(Path.pathname) && <Nav cart={cart} /> }
  {/* <main className='main-content'> */}

  <Routes>
    
    {
      AppRoutes.map(route =>{
        return <Route key ={route.id}path={route.path} element={route.component} />
      })
    }
  </Routes>

  {/* </main> */}
  <Footer />
    
</div> 

    
  )
  //js
}
//js
export default App

      

