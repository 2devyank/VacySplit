import React, { useEffect, useState } from 'react'

import { doc, getDoc,onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import Nav from './Nav';
import "../styles/Home.css"
import img from "../assets/profile.svg"
import { useUserAuth } from '../context/UserAuthContext';


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

console.log(userdet);
 
  
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
    {userdet.name}
      </div>
   <div  className='out'>
      <div className='text'>Address :</div>
      {userdet.address}
     </div>
    <div  className='out'>
      <div className='text'>Email :</div>
      {userdet.email}
      </div>
    <div  className='out'>

    <div className='text'>Mobile No :</div>
    {userdet.mobile}
    </div>
    <div  className='out'>

    <div className='text'>How much you lend money :</div>
    {userdet.debt}
    </div>
    <div  className='out'>
      <div className='text'>how much money you will get :</div>
     {userdet.credit}
      </div>


      
    </div>
    </div>
    </>
  )
}

export default Home