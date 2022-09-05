import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import { db } from '../firebase';
import "../styles/Payment.css"
import Header from './Header';
import Nav from './Nav';
function Paymentrec() {
  const{expensive,userdet,data}=useUserAuth();
const[pay,setpay]=useState([]);


useEffect(()=>{
  const fetchdata=async()=>{
    // let list=[];
    let money=[];
      try{
        const q = query(collection(db, "expense"), where("name", "==", localStorage.getItem('name')));

       
        onSnapshot(q, (querySnapshot) => {
           
            querySnapshot.forEach((doc) => {
                // list.push({id:doc.id,...doc.data()});
                money.push(doc.data().share);
                setpay(money);
            });
          
        })
      }catch(err){
    console.log(err);
      }
    }
    fetchdata();
    },[])
// console.log(pay);
const sum=pay.reduce((a, b) => a + b,0);

  return (
   <>
   <Nav/>
      <div className='all'>
    <div className='cen'>
        <div className='top'> 
           <Link to="/payment/recieve" className="left"> <span>Recieve Pay</span></Link>
           <Link to="/payment/pay" className="right">  <span>Pay</span></Link>
        </div>
        <br />
        <br />
        <div>
        <Table striped>
      <tbody>
          { pay.length >0 ?(data.map((data,index)=>(
       userdet.name!==data.name ?(
          <tr key={index}>
          <td>{data.name}</td>
           <td>₹ {sum.toString().substr(1)}</td>
         </tr>):(
           null
         )
       
          ))):(null)}
         
      </tbody>
    </Table>
        </div>
    </div>
    </div>
   
   </>
  )
}

export default Paymentrec