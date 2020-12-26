import './App.css';
// import "../src/styles.css"
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, useHistory, Redirect } from "react-router-dom";
import UserContext  from "./components/userContext";

import Header from "./components/header"
import Login from "./components/login"
import SignUp from "./components/register"
import Reservation from "./components/reservations"
import AllReservation from "./components/allreservations"

import DelReservation from "./components/deletereservations"
import EditReservation from "./components/editreservations"
import EditCustomer from "./components/editCustomer"
import Footer from "./components/footer"

import db from './firebase';
import firebase from "firebase";


function App() {

  const [userData, setUserData] = useState({
    tokenData:undefined,
    email:undefined,
    password:undefined
  });

  return (
    <div>

      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Header />
          <Switch>
            <Route exact path="/" component={AllReservation}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={SignUp}></Route>
            <Route exact path="/allreservations" component={AllReservation}></Route>
            <Route exact path="/reservations" component={Reservation}></Route>
            <Route exact path="/deletereservation" component={DelReservation}></Route>
            <Route exact path="/editreservations" component={EditReservation}></Route>
            <Route exact path="/editcustomer" component={EditCustomer}></Route>
            <Redirect to="/" />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
      <Footer/>

    </div>

  );
}

export default App;
