import React, { useState, useEffect } from 'react';
import products from '/public/products.json';
import '../home/home.css';
const Home = () => {
 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0); // New state variable for count

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data.slice(0, 3))); // Fetch and display only 3 products
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCount(count + 1); // Increment count when product is added to cart
  };
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
    setCount(Math.max(count - 1, 0)); // Decrement count when product is removed from cart
  };

  return (
    <div className='product-list-container'>
      
      <h2>Products</h2>
      <ul className='product-list'>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
      <CartItems cart={cart} />
     
      <p>Count: {count}</p> // Display count
    </div>
  );
};

const CartItems = ({ cart }) => {
  return (
    <ul>
      {cart.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
};

export default Home;