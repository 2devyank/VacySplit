import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {Alert, Button, Form} from "react-bootstrap"
import GoogleButton from 'react-google-button'
import { useUserAuth } from '../context/UserAuthContext';
import "../styles/Login.css"

function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const {login,googlesignin}=useUserAuth();
const navigate=useNavigate();

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      seterror("");
await login(email,password);
navigate("/user");
    }catch(err){
seterror(err.message);
    }
  }
const handlegooglesignin=async (e)=>{
e.preventDefault();
try{
await googlesignin();
navigate("/user")
}catch(err){
console.log(err.message)
}
}
  return (
<div className="allt">
<div className="cent">

    <div className='p-4 box text-center'>
        <h2 className='mb-3'>Login</h2>
        {error&&<Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handlesubmit}>
          <Form.Group className='mb-3'>
            <Form.Control type='email' placeholder='enter email'
             onChange={(e)=>setemail(e.target.value)}/>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control type='password' placeholder='enter password'
            onChange={(e)=>setpassword(e.target.value)}/>
          </Form.Group>
          <div className='d-grid gap-2'>
            <Button type="Submit" variant="primary">
              Log In
            </Button>

          </div>
        </Form>
        <hr />
        <div className='sel'>
          <GoogleButton onClick={handlegooglesignin} className='g-btn ' type='dark' />
        </div>
    <div className='p-4 box mt-3 text-center'>
      Don't have an account <Link to='/register'>Sign Up</Link>
    </div>

    </div>
</div>
</div>
  )
}

export default Login