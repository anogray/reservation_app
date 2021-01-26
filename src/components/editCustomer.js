import React, { useState, useEffect, useContext} from 'react';
import UserContext  from "./userContext";

import {useHistory  } from "react-router-dom";

import db from '../firebase';
import firebase from "firebase";
import { Button, Form } from "react-bootstrap";


const EditCustomer =  (props) => {
    console.log("inside editCustomer")
    console.log({ props })
    const [custProp, setCust] = useState({});
    const [isProp, setProp] = useState(false);
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);

    if(userData.email===undefined && userData.password===undefined) history.push("/allreservations")

    useEffect(() => {
        
        setCust(props.location.obj.sendingObj.dataBody)
       console.log("need to remove",custProp)
        db.collection("reservations").doc(custProp.Mail).delete(custProp.Mail)


    }, [])



    const handleSubmit = (e) => {
        e.preventDefault();

        db.collection("reservations").doc(custProp.Mail).set(custProp)
        history.push("/editreservations")
    }

    const handleChange = (e) => {

        setCust({ ...custProp, [e.target.name]: e.target.value })
    }
    return (
            
         <Form onSubmit={handleSubmit} >
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Property Name : </Form.Label>
              <Form.Control type="text" placeholder="PropertyName" className="btn_cmp" name="PropertyName" onChange={handleChange} value={custProp.PropertyName} required />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Location : </Form.Label>
              <Form.Control type="text" placeholder="Location" className="btn_cmp" name="Location" onChange={handleChange} value={custProp.Location} required />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Price : </Form.Label>
              <Form.Control  type="text"  placeholder="Price" className="btn_cmp" name="Price" onChange={handleChange} value={custProp.Price} required/>
            </Form.Group>
            
            <Button variant="primary" type="submit">
            Submit
          </Button>               
          </Form>

    )
}


export default EditCustomer;