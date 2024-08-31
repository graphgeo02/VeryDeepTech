import React, { useState } from 'react'
import { Link } from 'react-router-dom'





const Form = () => {
let [fullName, setFullName] = useState('');
let [email, setEmail] = useState('');
let [password, setPassword] = useState('');
let [terms, setTerms] = useState('');
let [gender, setGender] = useState('Male');
let [show, setShow] = useState('password');

    function handleSubmit(e){
           e.preventDefault();
           console.log("Form Submitted"); // Debug statemen
           let toDb = {
            fullName,
            email,
            password,
            terms,
            gender
           };
           console.log(toDb);
    }
    
  return (
    <div align='center'>
        <h2>Forms</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <fieldset>
                <label htmlFor='fullName'>Full Name: </label>
                <input 
                type='text' 
                name='fullName' 
                id='fullName' 
                placeholder='John Doe'
                value={fullName}
                onChange={(e)=> setFullName(e.target.value)}
                required
                />
            </fieldset>
            <fieldset>
                <label htmlFor='email'>Email: </label>
                  <input 
                  type='email' 
                  name='email' 
                  id='email' 
                  placeholder='JohnDoe@gmail.com'
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  required
                  />
            </fieldset>
            <fieldset>
                <label htmlFor='password'>Password: |
                </label>
               
                <span 
                onClick={()=>setShow(show==='password'? 'text':'password')}
                >
                  {" "}
                  {show === 'password'? 'show':'hide'}{" "}
                  </span>{" "}
                  <input 
                  type={show} 
                  name='password' 
                  id='password' 
                  placeholder='strong Password'
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                  />
            </fieldset>
            <fieldset>
                <span>Gender: </span>
                <label htmlFor='male'>Male</label>
                  <input 
                  type='radio' 
                  value='male'
                  name='gender' 
                  id='male'
                  onChange={(e)=> setGender(e.target.value)}
                  required
                  />
                <label htmlFor='female'>Female</label>
                  <input 
                  type='radio'
                  value='female' 
                  name='gender' 
                  id='female'
                  onChange={(e)=> setGender(e.target.value)}
                  required
                  />
            </fieldset>
            <fieldset>
               <input 
               type='checkbox' 
               name='terms' 
               id='terms'
               onChange={(e)=> setTerms(e.target.checked)}
               required
               />
                <label htmlFor='terms'> Clicking you accept our <Link to={'/#'}>Our terms and Condition</Link></label>  
            </fieldset>
            <fieldset>
              <button type='submit'> Submit</button>
            </fieldset>
        </form>
    </div>
  )
}

export default Form


