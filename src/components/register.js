import UserContext from "./userContext";
import db from '../firebase';
import React, { useState, useContext } from 'react';
import { Button, Form } from "react-bootstrap";

import {  useHistory } from "react-router-dom";
const bcrypt = require("bcryptjs");


const SignUp = () => {
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");
    const history = useHistory();

    const { userData, setUserData } = useContext(UserContext);

    if (userData.email !== undefined && userData.password !== undefined)
        history.push("/reservations")

    console.log({ email }, { password })



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ email }, { password })

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash", passwordHash)

        await db.collection("admin").doc(email).set({ password: passwordHash })
        await setUserData({
            email: email,
            password: passwordHash
        })
        history.push("/reservations")
    }

    return (
        <div className="signup">
            Hello please Signup for Admins below.

                <Form onSubmit={handleSubmit} >

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Email : </Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" name="email" value={email} onChange={(e) => setMail(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password : </Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPass(e.target.value)} required />
                    </Form.Group>

                    <Button type="submit" onClick={handleSubmit}>Submit</Button>

                </Form>


            </div>
    )
}

export default SignUp;