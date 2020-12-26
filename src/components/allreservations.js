import React, { useState, useEffect } from 'react';
import db from '../firebase';
import firebase from "firebase";
import { Button, Form } from "react-bootstrap";

const Allreservations = ()=>{

    const [customerData, setCustData] = useState([])
    let [addProperty, setProperty] = useState({})
    
    //let addDocument = ""

    useEffect(() => {

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

    const handleSubmit = async(e) => {
        e.preventDefault();

        await db.collection("reservations").doc(addProperty.Mail).set(addProperty)
        console.log("imsde handlesumit")
        console.log({addProperty})
        setProperty({...addProperty, Mail:"", Location:"", Price:"",PropertyName:""})
        console.log({addProperty})

    }

    let arrData = customerData.length? customerData.map(({id,dataBody}) => (
        <li key={id} className="listAll">{dataBody.PropertyName} , {dataBody.Location}, {dataBody.Price}, {dataBody.Mail} </li>


    )) : <p>No Property Reservation Found</p>
    console.log({addProperty})

    return(
        <div className="addHandle">
              

                <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>PropertyName</Form.Label>
                  <Form.Control name="PropertyName"  value={addProperty.PropertyName} type="text" onChange={handleChange} required/>
                  
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
                <Form.Control name="Location" type="text" value={addProperty.Location} onChange={handleChange} required/>
                
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control name="Price" value={addProperty.Price} type="text"  onChange={handleChange } required/>
              
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
            <Form.Label>Mail</Form.Label>
            <Form.Control name="Mail" value={addProperty.Mail} type="mail" onChange={handleChange } required/>
            
          </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>

                {arrData}
            </div>
    )
}

export default Allreservations