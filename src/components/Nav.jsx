import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import "../styles/Nav.css"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
function Nav() {

  const {user,logout,userdet}=useUserAuth();
  const navigate=useNavigate();


  const handlelogout=async(e)=>{
    e.preventDefault();
    try{
await logout();
navigate("/login");
    }catch(err){
console.log(err);
    }
  }

  const handleaddgroup=async(e)=>{
    e.preventDefault();
    try{
        
        await setDoc(doc(db,"group",user.uid),{
            name:userdet.name,
            mobile:userdet.mobile,
            timestamp:serverTimestamp(),
        });
        navigate("/group");
    }catch(err){
        console.log(err)
    }
   
}

const viewgroup=(e)=>{
  e.preventDefault();
  navigate("/group");
}



  return (
    <Navbar className='nav'>
    <Container className='bigger'>
      <Navbar.Brand >VacySplit</Navbar.Brand>
      
    <div className='left'>

      <Navbar.Text>
        <button  type="Submit"  className='but' onClick={viewgroup}>
       View Group
      </button>
      </Navbar.Text>
      <Navbar.Text>
        <button  type="Submit"  className='but' onClick={handleaddgroup}>
       Join Group
      </button>
      </Navbar.Text>
    
      

        <Navbar.Text>
        <button  type="Submit"  className='but' onClick={handlelogout}>
        Logout
      </button>
        </Navbar.Text>
    </div>
   
    </Container>
  </Navbar>
  )
}

export default Nav