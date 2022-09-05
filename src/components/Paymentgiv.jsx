import React from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import "../styles/Payment.css"
import Nav from './Nav';

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
          {expensive.map((expensive)=>(
        userdet.name!==expensive.name?( 
          <tr>
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
    </div>
    </div>
    </>
  )
}

export default Paymentgiv