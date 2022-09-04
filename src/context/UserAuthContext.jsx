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

import { collection, doc, getDoc,getDocs,onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const userAuthcontext=createContext();

export function UserAuthContextProvider({children}){
    const [user,setUser]=useState("");
    const[userdet,setuserdet]=useState({});
    const[expensive,setexpensive]=useState([]);

    

  

    
    

   
    
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
         const querySnapshot=await getDocs(collection(db,"expense"));
         querySnapshot.forEach((doc)=>{
           list.push({id:doc.id,...doc.data()})
           setexpensive(list);
         })
      }catch(err){
    console.log(err);
      }
    }
    fetchdata();
    },[])
return(
    <userAuthcontext.Provider value={{user,signup,login,logout,googlesignin,userdet,data,expensive}}>
        {children}
    </userAuthcontext.Provider>
)
}

export function useUserAuth(){
    return useContext(userAuthcontext);
}