import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Blognav from '../blogNav/Blognav';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../atom/user';
import { useNavigate } from 'react-router-dom';

    

const Schema = Yup.object().shape({
    title: Yup.string().min(2, "too short").max(100,"too long").required('Required'),
    intro: Yup.string().min(2, "too short").max(100,"too long").required('Required'),
    content: Yup.string().required(),
    author : Yup.string().required()
     
    
});

 const CreateBlog = () => {
    let redir = useNavigate();
    let [user, setUser] = useRecoilState(userInfo); // to update the state of atom 
    return (
      
<div align='center'>
  <Blognav />
    <h1>CreateBlog</h1>
    <Formik
      initialValues={{
        title: '',
        intro: '',
        author: user.data.fullName,
        content: ''
      }}
      validationSchema={Schema}
      onSubmit={ async(values) => {
      
axios.post("http://localhost:8000/Blog", values)
.then(resp=>{
  redir("/blog")
}).catch(err=>{
  console.error(err)
})
      
      }}
    >
      { ({ errors, touched }) => (
        <Form>
            <fieldset>
          <label htmlFor='tile'>Title: </label>
          <Field name="title" id='title'/>
          {touched.title && errors.title && <div>{errors.title}</div>}
            </fieldset>
            <fieldset>
          <label htmlFor='intro'>Brief Discription: </label>
          <Field type='text'name="intro" id='intro'/>
          {touched.intro && errors.intro && <div>{errors.intro}</div>}
            </fieldset>
            <fieldset>
          <label htmlFor='author'>Author: </label>
          <Field type='text'name="author" id='author'/>
          {touched.author && errors.author && <div>{errors.author}</div>}
            </fieldset>
            <fieldset>
          <label htmlFor='content'>Content: </label>
          <Field as='textarea'name="content" id='content'/>
          {touched.content && errors.content && <div>{errors.content}</div>}
            </fieldset>
            
          <button type="submit" >Submit</button>
        </Form>
      )}
    </Formik>
  </div>

    )
}
    
  export default CreateBlog;

