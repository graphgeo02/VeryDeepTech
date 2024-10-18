import React from 'react';

const CartItems = ({ cart }) => {
  return (
    <ul>
      {cart.map(item => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Quantity: 1</p>
        </li>
      ))}
    </ul>
  );
};

export default CartItems;