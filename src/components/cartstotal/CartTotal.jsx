import React from 'react';

const CartTotal = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div>
      <h2>Cart Total: ${total}</h2>
    </div>
  );
};

export default CartTotal;