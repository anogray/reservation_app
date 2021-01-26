import React, { useState, useEffect, useContext} from 'react';
import UserContext  from "./userContext";

import {useHistory  } from "react-router-dom";

import db from '../firebase';
import { Button } from "react-bootstrap";

const DeleteReservation = ()=>{

    const [customerData, setCustData] = useState({})
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);

    if(userData.email===undefined && userData.password===undefined) history.push("/allreservations")

    useEffect(() => {

        const callrender = async () => {
            await db.collection("reservations").onSnapshot(snapshot => {
                setCustData(snapshot.docs.map(doc=>({id:doc.id, dataBody:doc.data()})))
            })


        }
        callrender()


    }, [])


       const deleteProperty = (id)=>{
        //     
        console.log("removal of object from property",id)
        db.collection("reservations").doc(id).delete(id);
    
         }

         let arrData = customerData.length ? customerData.map(({id,dataBody}) => (
            <li key={id} className="listAll">{dataBody.PropertyName} , {dataBody.Location}, {dataBody.Price}, {dataBody.Mail}
            <Button className="authbtn" onClick={()=>deleteProperty(id)}>Delete</Button> </li>
    
    
        )) : <p>"No Property Reservation Found"</p>
        console.log({ arrData })

       

        return (
            <div>
            
                {arrData}
                <Button className="authbtn" name="backToReservations" onClick={()=>history.push("./reservations")}>Back</Button>
                </div>   
        ) 
    
}

export default DeleteReservation;