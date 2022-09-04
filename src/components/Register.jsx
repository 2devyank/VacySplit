import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import GoogleButton from 'react-google-button'
import { Link,useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

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
navigate("/login");
    }catch(err){
seterror(err.message);
    }
  }
  return (
    <div>
       <h2 className='mb-3'>Sign in</h2>
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
      have an account <Link to='/login'>Log In</Link>
    </div>
    </div>
  )
}

export default Register