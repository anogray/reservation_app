import React, { useState, useEffect, useContext} from 'react';
import UserContext  from "./userContext";
import db from '../firebase';
import firebase from "firebase";
import {Route, Switch, BrowserRouter,useHistory  } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../styles.css"


const Reserves = () => {

    // let reservationObj = { Location: "Punjab", Price: 12, PropertyName: "Bhr" }
    const [customerData, setCustData] = useState({})
    let [addProperty, setProperty] = useState({})
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    
    if(userData.email===undefined && userData.password===undefined)
    history.push("/allreservations")

    console.log("hello fxn")
    let rdrData = "no Property array"
    
    useEffect(() => {

        const callrender = async () => {
            await db.collection("reservations").onSnapshot(snapshot => {
                setCustData(snapshot.docs.map(doc=>({id:doc.id, dataBody:doc.data()})))
            })


        }
        callrender()


    }, [])

    // useEffect(() => {

    //     const callrender = async () => {
    //         await db.collection("reservations").doc(mailtest).onSnapshot(snapshot => {
    //             setCustData(snapshot.data())

    //             //  rdrData = add();
    //             // console.log({rdrData})
    //         })


    //     }
    //     callrender()


    // }, [])
    //For adding new property for customer's account
    //db.collection("reservations").doc(mailtest).update({reservationArr: firebase.firestore.FieldValue.arrayUnion(reservationObj)})


    

    const deleteProperty = (id)=>{
    //     
    console.log("removal of object from property",id)
    db.collection("reservations").doc(id).delete(id);

     }

    //const add=()=>{
    console.log("inside add()")
    let arrData = customerData.length ? customerData.map(({id,dataBody}) => (
        <li key={id} className="listAll mg">{dataBody.PropertyName} , {dataBody.Location}, {dataBody.Price}, {dataBody.Mail}
        </li>
    )) : <p>"No Property Reservation Found"</p>
    console.log({ arrData })
    // }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.name==="delete")
        history.push("/deletereservation")

        if(e.target.name==="edit")
        history.push("/editreservations")

    }
    let editBar = <Button name="edit" className="authbtn" onClick={handleSubmit}> Edit</Button>
    let DelBar = <Button name="delete" className="authbtn" onClick={handleSubmit}> Delete</Button>

    return (
        <div>
            <p>This is reservations page </p>
            {editBar}
            {DelBar}
            <h1 className="HeadingTable">Customer Details</h1>
            {arrData}
            
            
            <Button name="backTologin" className="authbtn" onClick={()=>history.push("./login")}>Back</Button>           
        </div>
    )




}
export default Reserves;


