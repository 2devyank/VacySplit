
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { auth ,db} from '../firebase';
import "../styles/User.css"

function Userdetails() {
    const [data,setdata]=useState({name:'',mobile:'',address:'',email:''});
    const {user}=useUserAuth();
    const navigate=useNavigate();

const handleadd=async(e)=>{
    e.preventDefault();
    try{
        
        await setDoc(doc(db,"users",user.uid),{
            ...data,
            timestamp:serverTimestamp(),
        });
navigate("/home")
    }catch(err){
        console.log(err)
    }
   
}

    return (
      <div className='big'>
      <div className="inner">

    <div>
        <h2 className='text-center'>Enter Profile Details</h2>
        <br />
        <Form onSubmit={handleadd}>
        <Form.Group className='mb-3'>
            <Form.Control type='name' placeholder='enter your name'
            onChange={(e)=>setdata({...data,name:e.target.value})}
             />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control type='phone no' placeholder='enter your mobile number'
            onChange={(e)=>setdata({...data,mobile:e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control type='address' placeholder='enter your Address'
            onChange={(e)=>setdata({...data,address:e.target.value})}
            />
          </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Control type='email' placeholder='enter your registered email'
           onChange={(e)=>setdata({...data,email:e.target.value})} 
            />
          </Form.Group>
         
        <Button type="Submit">
            Update the Profile
        </Button>
        </Form>
    </div>
    </div>
    </div>
  )
}

export default Userdetails