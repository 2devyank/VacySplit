import React, { useEffect, useState } from 'react'

import Nav from './Nav';
import "../styles/Home.css"
import img from "../assets/profile.svg"
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Home() {
  const {userdet}=useUserAuth();
  // const[userdet,setuserdet]=useState({});

  

// useEffect(()=>{
//   const fetchdata=async()=>{
//     // console.log(user.uid);
//     const docRef = doc(db, "users",localStorage.getItem('id'));
//    await getDoc(docRef)
//     .then((doc)=>{
//       setuserdet(doc.data())
//       // console.log(doc.data())
//     })
//   }
//   fetchdata();
// },[])

// console.log(userdet);
localStorage.setItem('name',userdet.name);
  
  return (
    <>
    <Nav/>
    <div className='outer'>
      <div className='first'>

    <div><img src={img}  /></div>
      </div>
    <div className='sec'>
    <div className='out'>
      
      <div className='text'>Name :</div>
      <span className='res'>
    {userdet.name}

      </span>

      </div>
   <div  className='out'>
      <div className='text'>Address :</div>
      <span  className='res' >
        {userdet.address}
        </span>
     </div>
    <div  className='out'>
      <div className='text'>Email :</div>
      <span className='res'>

      {userdet.email}
      </span>
      </div>
    <div  className='out'>

    <div className='text'>Mobile No :</div>
    <span className='res'>

    {userdet.mobile}
    </span>

    </div>
    <div  className='out'>

   <Link to="/payment/pay">
   <Button>Payment Transaction</Button>
   </Link>
    </div>
    

      
    </div>
    </div>
    </>
  )
}

export default Home