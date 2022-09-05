import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import Header from './Header'
import grp from "../assets/grp.png"
import del from "../assets/delete.png"
import "../styles/Group.css"

function Group() {
  const {userdet,data,expensive,setdata}=useUserAuth();
//   const [data,setdata]=useState([]);

// useEffect(()=>{
// const fetchdata=async()=>{
//   let list=[];
//   try{
//      const querySnapshot=await getDocs(collection(db,"group"));
//      querySnapshot.forEach((doc)=>{
//        list.push({id:doc.id,...doc.data()})
//        setdata(list);
//      })
//   }catch(err){
// console.log(err);
//   }
// }
// fetchdata();
// },[])

const handledelete=async(id)=>{
try{
  await deleteDoc(doc(db,"group",id))
  setdata(data.filter((item)=>item.id!==id));
}catch(err){
console.log(err);
}

}
// console.log(data);

  return (
    <>
    <Header/>
    <br />
    <h2>Welcome {userdet.name} !</h2>
      <br />
      <Table striped>
      <thead>
        <tr>
          <th>#</th>

          <th>Name</th>
          <th>Phone No</th>
          <th>Category</th>
          <th>Remove Member</th>
        </tr>
      </thead>
      <tbody>
          {data.map((data)=>(
        <tr>
<td><img src={grp} style={{width:"35px"}}  /></td>
          <td>{data.name}</td>

          <td>{data.mobile}</td>
          <td>member</td>
          <td className="del" onClick={()=>handledelete(data.id)}><img src={del} style={{width:"35px"}}  /></td>
        </tr>
          ))}
         
      </tbody>
    </Table>
    <br />
   <h3>
      Previous Expenses
     </h3>
    <br />
    <Table striped>
      <thead>
        <tr>
          <th>Description</th>
          <th>Total Amount</th>
          <th>Paid By</th>
          <th>Share Per Person</th>
         
        </tr>
      </thead>
      <tbody>
          {expensive.map((expensive)=>(
        <tr>

          <td>{expensive.description}</td>

          <td>₹{expensive.amount}</td>
          <td>{expensive.name}</td>
          <td>₹{expensive.share}</td>
          {/* <td className="del" onClick={()=>handledelete(data.id)}><img src={del} style={{width:"35px"}}  /></td> */}
        </tr>
          ))}
         
      </tbody>
    </Table>
    
    </>
  )
}

export default Group
