import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Blognav from '../blogNav/Blognav';
import { redirect } from 'react-router-dom';
import axios from 'axios';
import { userInfo } from '../atom/user';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useTransition } from 'react';
import debounce from 'debounce';
const Schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    fullName: Yup.string().min(2, 'Too Short!').required('Required'),
    password: Yup.string().min(8, "Must Contain 8 Characters").required()
    .matches(
      /^(?=.*[a-z])/,
      " Must Contain One Lowercase Character"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "  Must Contain One Uppercase Character"
    )
    .matches(
      /^(?=.*[0-9])/,
      "  Must Contain One Number Character"
    )
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
    // gender: Yup.string().when(['gender'], {
    //     is: (gender) => gender=== 'others' || 'female' ,
    //     then: Yup.string().required(' Required')
    //    }),
     gender: Yup.string().required('Required'),
     terms: Yup.string().matches(
        /true/,
        "  accept to continue"
      ).required('Required'),
   
 
});

 const Signup = () => {
  console.count("signup render ");
  let [user, setUser] = useRecoilState(userInfo);
  let redir = useNavigate();
  let [isPending, startTransition] = useTransition(false);
    console.log('submit form ') //debugger
    return (
      
<div align='center'>
  <Blognav />
    <h1>Signup</h1>
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
        gender: '',
        terms: '',
      }} 
      validationSchema={Schema}
      onSubmit={ async(values) => {
       let upd ={
        id : values.email,
        gender: values.gender,
        role: 'normal',
        fullName: values.fullName,
        password: values.password,
        terms: values.terms
       };
         
       /*  method 
       steps to preventmultiple sign up with same email
       > get all users
       >check if type email exist 
       > if it exist dont sign up else sign up
       */
       


        try{
        let getUser = await axios.get(`http://localhost:8000/User`);
        let isUnique = false;
        getUser.data.forEach(user =>{
          if(user.id === values.email){
             isUnique = true;
          }
        });

        // check if user is not there sign him up
        if(!isUnique){
          axios.post("http://localhost:8000/User", upd)
          .then(resp=>{
           startTransition(()=>{
            setTimeout(()=>{
              setUser({isLoggedIn: true, data: resp.data});
            }, 100000 * 300)
            redir('/blog');
           
           })
            
          })
          .catch(err=>{
            console.error(err);
          })
        }   else{
          alert(" A user exist with this email")
        }
        // console.log(getUser.request.status);
        }catch(err){
           console.log(err);
        }


        
      }}
    >
      {({ errors, touched }) => (
        <Form>
            <fieldset>
          <label htmlFor='fullName'>Full Name: </label>
          <Field name="fullName" id='fullName'/>
          {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
            </fieldset>
            <fieldset>
          <label htmlFor='password'>Password: </label>
          <Field type='password'name="password" id='password'/>
          {touched.password && errors.password && <div>{errors.password}</div>}
            </fieldset>
            <fieldset>
          <label htmlFor='email'>Email: </label>
          <Field name="email" id='email'/>
          {touched.email && errors.email && <div>{errors.email}</div>}
            </fieldset>

            <fieldset role="group" aria-labelledby="gender-group">
                <span>Gender: </span>
            <label>
              <Field type="radio" name="gender" value="male" />
              Male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              Female
            </label>
          {touched.gender && errors.gender && <div>{errors.gender}</div>}
            </fieldset>
            <fieldset>
          <label htmlFor='terms'>Terms: </label>
          <Field type='checkbox' name="terms" id='terms'/>
          {touched.terms && errors.terms && <div>{errors.terms}</div>}
            </fieldset>
          <button type="submit">Submit</button>{" "}
           { isPending && ("Signup successfully")}
        </Form>
      )}
    </Formik>
  </div>

    )
}
    
  export default React.memo(Signup);

