import React, { useState, useEffect,useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions"
import UserContext  from "./userContext";

const Header = ()=>{

  const { userData, setUserData } = useContext(UserContext);

        return(
            <header id="header">
            
            {
              userData.email && userData.password ?
            (<NavLink style={{ 'text-decoration-line': 'none' }} to="/reservations" ><h1 className="headlink">ONLINE RESERVATION PORTAL</h1></NavLink>) : 
            (<NavLink style={{ 'text-decoration-line': 'none' }} to="/">
            <h1 className="headlink" >ONLINE RESERVATION PORTAL</h1>
          </NavLink>)
        }
          <AuthOptions/>
    </header>
        )

}

export default Header;