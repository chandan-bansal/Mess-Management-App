import StudentContext from "./context";
import { useState } from "react";


function StudentProvider(props){
const [token,setToken]=useState(null);
const [email,setEmail]=useState("");

const userIsLoggedIn=!!token;

const logInHandler=(token,email)=>{
setToken(token);
setEmail(email);
}

 const state={
    email:email,
    isLoggedIn:userIsLoggedIn,
    token:token,
    login:logInHandler
 }

 return <StudentContext.Provider value={state}>
        {props.children}
 </StudentContext.Provider>
}

export default StudentProvider;