import  { createContext } from "react";

const StudentContext=createContext({
    token:"",
    email:"",
    login:(token)=>{}
});

export default StudentContext;
