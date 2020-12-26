import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext  from "../components/userContext";
import { Button, Form } from "react-bootstrap";
import "../../src/styles.css"

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      email:undefined,
    password:undefined
    });
  };

  return (
    <nav className="auth-options">
      {userData.email && userData.password ? (
        <Button className="authbtn" onClick={logout}>Log out</Button>
      ) : (
        <>
          <Button className="authbtn" onClick={register}>Register</Button>
          <Button className="authbtn" onClick={login}>Log in</Button>
        </>
      )}
    </nav>
  );
}