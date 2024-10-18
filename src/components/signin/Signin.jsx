import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Blognav from '../blogNav/Blognav';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../atom/user';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import useTransition from 'react-transition-state';
import { Link } from 'react-router-dom'; 
import './signin.css'; 
const Schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, "Must Contain 8 Characters").required()
    .matches( /^(?=.*[a-z])/," Must Contain One Lowercase Character")
    .matches( /^(?=.*[A-Z])/, "  Must Contain One Uppercase Character" )
    .matches( /^(?=.*[0-9])/, "  Must Contain One Number Character" )
    .matches( /^(?=.*[!@#\$%\^&\*])/, "  Must Contain  One Special Case Character" ),
});

 const Signin = () => {
  console.count("signin render ");
    let redir = useNavigate();
    let [user, setUser] = useRecoilState(userInfo); // to update the state of atom 
    let [isPending, startTransition] = useTransition();

    function displayText(){
     
      console.log("text") 
    }

    return (
      
     <>
       <Blognav />
<div className="signin-container" >
    <h1  className="signin-title">Signin</h1>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Schema}
      onSubmit={ async(values) => {
      


        /*steps to login a user 
        > use  type email to verify if  user exist in db
        if exist, use type password to match the password from db 
        >login else dont
        */
       try{
        // console.log("before await")
           let getUser = await axios.get(`http://localhost:8000/User/${values.email}`);
          //  console.log("after await")
           if(getUser.data.password === values.password){
        
           startTransition(()=>{         // trans code start here
            setTimeout(()=>{
              getUser();
            }, 10000 *30)
         
           })                         // trans code end here

         setUser({isLoggedIn: true, data: getUser.data})
         redir('/blog')

           }else{
            alert('Wrong email or password')
           }
       }catch(err){

       }

        // same shape as initial values
        console.log(values);
        
      }}
    >
      {({ errors, touched }) => (
        <Form className="signin-form">
            <div className="form-group">
          <label htmlFor='email'>Email: </label>
          <Field type="email" name="email" id='email'/>
          {touched.email && errors.email && <div>{errors.email}</div>}
            </div>
            <div className="form-group">
          <label htmlFor='password'>Password: </label>
          <Field type='password'name="password" id='password'/>
          {touched.password && errors.password && <div>{errors.password}</div>}
            </div>
            
          <button type="submit" className="signin-btn">Submit</button>
             
          {" "}{ isPending && <span className="signin-pending">Please Signin. Dont have account? <Link to='/signup'>Signup</Link></span>}   
          </Form>
      )}
    </Formik>
  </div>
</>
    )
}
    
  export default React.memo(Signin);

