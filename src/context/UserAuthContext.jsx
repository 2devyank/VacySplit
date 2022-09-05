import { useContext } from "react";
import { createContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import {auth} from "../firebase";
import { useState } from "react";
import { useEffect } from "react";

import { collection, doc, getDoc,getDocs,onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase';

const userAuthcontext=createContext();

export function UserAuthContextProvider({children}){
    const [user,setUser]=useState("");
    const[userdet,setuserdet]=useState({});
    const[expensive,setexpensive]=useState([]);
    // const[money,setmoney]=useState([]);

    

  

    
    

   
    
    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password);

    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);

    }
    function logout(){
        return signOut(auth);
    }
    function googlesignin(){
        const googleAuthProvider=new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider);
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            localStorage.setItem('id', currentUser.uid);
        })
return()=>{
    unsubscribe();
}
    },[])

    useEffect(()=>{
        const fetchdata=async()=>{
          // console.log(user.uid);
          const docRef = doc(db, "users",localStorage.getItem('id'));
         await getDoc(docRef)
          .then((doc)=>{
            setuserdet(doc.data())
            // console.log(doc.data())
          })
        }
        fetchdata();
      },[])
localStorage.setItem('name',userdet.name);
      const [data,setdata]=useState([]);

useEffect(()=>{
const fetchdata=async()=>{
  let list=[];
  try{
     const querySnapshot=await getDocs(collection(db,"group"));
     querySnapshot.forEach((doc)=>{
       list.push({id:doc.id,...doc.data()})
       setdata(list);
     })
  }catch(err){
console.log(err);
  }
}
fetchdata();
},[])

useEffect(()=>{
    const fetchdata=async()=>{
      let list=[];
      try{
        const q = query(collection(db, "expense"), where("capital", "==", "true"));

        //  querySnapshot.forEach((doc)=>{
        //    list.push({id:doc.id,...doc.data()})
        //    setexpensive(list);
        //  })
        onSnapshot(q, (querySnapshot) => {
           
            querySnapshot.forEach((doc) => {
                list.push({id:doc.id,...doc.data()});
                setexpensive(list);
            });
          
        })
      }catch(err){
    console.log(err);
      }
    }
    fetchdata();
    },[expensive])


    // useEffect(()=>{
    //   const fetchdata=async()=>{
    //     let list=[];
       
    //       try{
    //         const q = query(collection(db, "expense"), where("name", "==",localStorage.getItem('name')));
    
    //         onSnapshot(q, (querySnapshot) => {
               
    //             querySnapshot.forEach((doc) => {
    //                 list.push({id:doc.id,...doc.data()});
    //                 // list.push(doc.data().share);
    //                 setmoney(list);
    //             });
              
    //         })
    //       }catch(err){
    //     console.log(err);
    //       }
    //     }
    //     fetchdata();
    //     },[])

// console.log(money)
// console.log(userdet.name.toString())


return(
    <userAuthcontext.Provider value={{setdata,user,signup,login,logout,googlesignin,userdet,data,expensive}}>
        {children}
    </userAuthcontext.Provider>
)
}

export function useUserAuth(){
    return useContext(userAuthcontext);
}