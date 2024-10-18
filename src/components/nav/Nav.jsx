
import React from 'react'
import { Link, Route } from 'react-router-dom'
import './nav.scss'
import { useRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import {  Routes } from "react-router-dom"
import { AppRoutes } from '../routesData/RoutesData'
import { atomCart } from '../../atomcart/atom'

const Nav = () => {
    let cart = useRecoilValue(atomCart);
    let count = useRecoilState(atomCart)
  return <div id="Nav">
        <ul>
            {/*Route step 3*/}
            {/* <li>
                {""}
                <Link to='/'>Home</Link>{""}
                </li>
            <li>
                {""}
                <Link to='/car'>Car</Link>{""}
                </li>
            <li>
                {""}
                <Link to='/cat'>Cat</Link>{""}
                </li>
            <li>
                {""}
                <Link to='/flower'>Flower</Link>{""}
                </li>
            <li>
                {""}
                <Link to='/lists'>List</Link>{""}
                </li> */}

                {AppRoutes.map((route)=>{
                    return(
          
             
                <li style={{ display: route.navName ==='null'?'none': 'flex'}} key={route.id}>
                   <Link to={route.path}>{route.navName}</Link>
                </li>
        
                    )
                })

                }
                    <Link   style={{ backgroundColor: '#333', color: '#fff', padding: '5px 10px', borderRadius: '50%'}} to="/cart">
                       Cart [{cart.length}]
                       Count ({count})
                    </Link>  
                    
                    
  
   
    
  

        </ul>
      
    </div>
  
}

export default Nav