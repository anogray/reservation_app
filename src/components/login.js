import db from "../firebase"
import UserContext  from "./userContext";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext} from 'react';
import firebase from "firebase";
import { Button, Form } from "react-bootstrap";
const bcrypt = require("bcryptjs");


const Login = () => {
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");
    const[CollectionAdmins,setCollectionAdmins]=useState([]);
    const [error, setError] = useState("");
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    if(userData.email!==undefined && userData.password!==undefined) history.push("/reservations")
 
    // let SnapShot = [];
    // let CollectionAdmins = []

    useEffect(() => {
        console.log("this is ADMIN USEFFECT")
        const getAdmins =  async() => {
            let snapshot =  await db.collection('admin').get();
            let sp =  snapshot.docs.map((doc) => ({ id: doc.id, credentials: doc.data() }))
             setCollectionAdmins(sp)
             console.log("docs of admins collections", CollectionAdmins)
        }
       getAdmins();

    }, [])

    // useEffect(() => {

    //     console.log("useEffect being calling")
    //     const checkLogin = async () => {

    //         if (checkConfirm.id === email && checkConfirm.credentials.password === password) {
    //             console.log("Admin logged in")
    //             setError("")
    //             history.push("/allreservation")
    //         }





    //         // let snapshot = await db.collection('admin').get();
    //         // console.log({snapshot})

    //         // collection = snapshot.docs.map((doc)=>({id:doc.id,credentials:doc.data()}))
    //         //  checkConfirm = collection[0];
    //         // console.log({checkConfirm})

    //         // console.log({collection})


    //     }

    //     checkLogin();

    // })

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        console.log({ email }, { password })
        let breakFlag = false;
        console.log("inside login",CollectionAdmins)

        
        for (let i = 0; i < CollectionAdmins.length; i++) {
            let adminObj = CollectionAdmins[i];
            
            let isMatch = await bcrypt.compare(password, adminObj.credentials.password);

            if (email === adminObj.id && isMatch) {
                console.log("Admin logged in")
                setError("")
                breakFlag = true;
                await setUserData({email:adminObj.id,password:adminObj.credentials.password});
                break;

            }
        }

        if (breakFlag)
        {
            //console.log("going with mr admin ",email)
            setError("")
            
            console.log("context state data ",userData)
            history.push("/reservations")

        }

        //     }
        else {
            console.log("Only Admin can login")
            setMail("");
            setPass("");
            setError("Only Admin can login");
        }
        //collection.snapshot.doc.data();
        // snapshot.forEach(doc => {
        //     collection[doc.id] = doc.data();
        // });





    }



    return (
        <div className="Login">
            Hello please Login with owner credentials below.

            <Form onSubmit={handleSubmit} >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setMail(e.target.value)} required/>
              
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPass(e.target.value)} required />
            </Form.Group>
           
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>




            {error}
        </div>
    )
}

export default Login;