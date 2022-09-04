
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useUserAuth } from '../context/UserAuthContext';
import { auth ,db} from '../firebase';

function Userdetails() {
    const [data,setdata]=useState({name:'',mobile:'',address:'',email:'',debt:'',credit:''});
    const {user}=useUserAuth();

const handleadd=async(e)=>{
    e.preventDefault();
    try{
        
        await setDoc(doc(db,"users",user.uid),{
            ...data,
            timestamp:serverTimestamp(),
        });

    }catch(err){
        console.log(err)
    }
   
}

    return (
    <div>
        {user&&user.email}
        {user.uid}
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
  )
}

export default Userdetails