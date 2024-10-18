import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { AppRoutes } from './components/routesData/RoutesData';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import BlogDetails from './components/blogDetails/BlogDetails';
import Home from './components/home/Home';
import About from './components/about/About';
import Portpolio from './components/portfolio/Portpolio';
import Blog from './components/blog/Blog';
import Form from './components/form/Form';
import { useState } from 'react';

// Function to add products to cart
const addToCart = (product) => {
  setCart([...cart, product]);
};

function App() {
  let Path = useLocation();
  let noNav = [   '/blog'   , '/signin', '/signup', '/create']; // Remove old nav from this new component, we later update with blogNav
  let [cart, setCart] = useState([]); // Initialize cart state as an empty array

  return (
    <div>
      {/* Render Nav component only if current path is not in noNav array */}
      {!noNav.includes(Path.pathname) && <Nav cart={cart} />}
      
      {/* Render Routes */}
      <Routes>
        {
          AppRoutes.map(route => {
            return <Route key={route.id} path={route.path} element={route.component} />
          })
        }
        {/* Pass addToCart function as prop to Home component */}
        <Route path="/" element={<Home addToCart={addToCart} />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;