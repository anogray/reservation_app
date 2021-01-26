import {useHistory  } from "react-router-dom";
import React, { useState, useEffect, useContext} from 'react';
import db from '../firebase';
import UserContext  from "./userContext";
import { Button, } from "react-bootstrap";


const EditReservation = ()=>{

    const [customerData, setCustData] = useState({})
    let [addProperty, setProperty] = useState({})
    let [editProp,setProp] = useState({});
    let [canSend,setSend] = useState(false);
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);

    
    if(userData.email===undefined && userData.password===undefined) history.push("/allreservations")

    
    useEffect(() => {
        

        console.log("context in active ",userData)
        const callrender = async () => {
            await db.collection("reservations").onSnapshot(snapshot => {
                setCustData(snapshot.docs.map(doc=>({id:doc.id, dataBody:doc.data()})))
            })
        }
        callrender()


    }, [])


    const handleChange=(e)=>{

        setProperty({...addProperty,[e.target.name]:e.target.value })
    }

    const editProperty=(sendingObj)=>{

        //console.log("editing  object from property",id)
        //db.collection.
         console.log("sendingObj",sendingObj)
           setProp(sendingObj)
           setSend(true);
         console.log(canSend)
         history.push({pathname:"./editCustomer" , obj:{sendingObj}})
         //return <Redirect to={{pathname: "./editCustomer", state: sendingObj}}/>
         //<EditCustomer obj={sendingObj}/>
    }


    let arrData = customerData.length ? customerData.map(({id,dataBody}) => (
        <div className="editBtnList">
        <li key={id} className="editList">{dataBody.PropertyName} , {dataBody.Location}, {dataBody.Price}, {dataBody.Mail}
        <Button className="authbtn" onClick={()=>editProperty({id,dataBody})}>Edit</Button>
        </li>
        </div>
        

    )) : <p>"No Property Reservation Found To Remove"</p>
    console.log({ arrData })

    return (
        <div>            
            {arrData}
            <Button className="authbtn" name="backToReservations"  onClick={()=>history.push("./reservations")}>Back</Button>

            </div>   
    ) 
}

export default EditReservation;