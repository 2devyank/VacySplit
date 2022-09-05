import React from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import "../styles/Payment.css"
import Nav from './Nav';
import GooglePayButton from "@google-pay/button-react"
import Payment from './Payment';

function Paymentgiv() {
    const{expensive,userdet}=useUserAuth();
    const nam="sadf";
  
  return (
    <>
      <Nav/>
    <div className='all'>
    <div className='cen'>
        <div className='top'> 
           <Link to="/payment/recieve" className="left"> <span >Recieve Pay</span></Link>
           <Link to="/payment/pay" className="right">  <span >Pay</span></Link>
        </div>
        <br />
        <br />
        <div>
        <Table striped>
      <tbody>
          {expensive.map((expensive,index)=>(
        userdet.name!==expensive.name?( 
          <tr key={index}>
          <td>{expensive.name}</td>
           <td>Pay ₹{expensive.share}</td>
         </tr>
         ):(
           null
           )
         
          ))}
         
      </tbody>
    </Table>
        </div>
        {/* <Payment/> */}
    </div>
    </div>
    </>
  )
}

export default Paymentgiv