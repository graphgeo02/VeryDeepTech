import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { atomCart } from '../../atomcart/atom'

const Hooks = () => {
    
    let [count, setCount] = useState(0);
    let clickCount = useRef(0);
    let [cart, setCart] = useRecoilState(atomCart)
       function addCount(){
        setCount(count += 1);
       }

       function reduceCount(){
       if(!(count <=0)){
      setCount((count -= 1));
       } 
    }

    useEffect(()=>{
    console.log("Data fetched")
    }, [count])
    console.count("rendered ")
  return (
    <div>
        <h2>Hooks</h2>
        <h3>
        Count: {count} 
        <button onClick={()=>addCount()}>Count++</button>
        
        
        <button onClick={()=>reduceCount()}>Count--</button>
        <button  onClick={()=>clickCount.current += 1}>ClickCount | {clickCount.current}</button>
        <button  onClick={()=>setCart((prev) => prev + 1)}>addCart</button>
        </h3>
    </div>
  )
}

export default Hooks;