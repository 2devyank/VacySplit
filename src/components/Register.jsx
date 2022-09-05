import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import { Link,useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import "../styles/Register.css"

function Register() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const {signup}=useUserAuth();
const navigate=useNavigate();

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      seterror("");
await signup(email,password);
navigate("/");
    }catch(err){
seterror(err.message);
    }
  }
  return (
    <div className="alll">
<div className="cenn">
    <div className='text-center'>
       <h2 className='mb-3 '>Sign Up</h2>
       {error&&<Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handlesubmit}>
          <Form.Group className='mb-3'>
            <Form.Control type='email' placeholder='enter email'
            onChange={(e)=>setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control type='password' placeholder='enter password'
             onChange={(e)=>setpassword(e.target.value)}
             />
          </Form.Group>
          <div className='d-grid gap-2'>
            <Button type='Submit' variant='primary'>
             Sign in
            </Button>

          </div>
        </Form>
        <hr />
        {/* <div>
          <GoogleButton className='g-btn' type='dark' />
        </div> */}
    <div className='p-4 box mt-3 text-center'>
      Already have an account <Link to='/login'>Log In</Link>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Register