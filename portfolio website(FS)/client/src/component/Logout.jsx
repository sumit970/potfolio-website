import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usercontext } from "./Routerpage";

const Logout = () => {
  const history=useNavigate();
  const {state,dispatch} = useContext(usercontext)
    const callAboutPage = async () => {
        try {
          const res = await fetch("http://localhost:5000/logout", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "content-type": "application/json",
            },
          });
          const data = await res.json();
          
          console.log(data);
          if (!data) {
            const error = new Error(res.error);
            throw error;
          }
          else 
          {
            dispatch({type:'USER',payload:false})
            history("/");
          }
    
    
        } catch (error) {
          console.log(error);
          
        }
      };
    
      useEffect(() => {
        callAboutPage();
      }, []);
    
  return (
    <div>Logout ka page </div>
  )
}

export default Logout