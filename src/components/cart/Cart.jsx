import React from 'react'
import { useRecoilValue } from 'recoil'
import { atomCart } from '../../atomcart/atom'

const Cart = () => {
    let cart = useRecoilValue(atomCart)
  return (
    <div>Cart[{cart}]</div>
  )
}

export default Cart;