import React, { useState, useEffect } from 'react'
import "./Login.css";
import { auth, provider } from "./firebaseConfig";
import { signInWithRedirect, signInWithEmailAndPassword, getRedirectResult } from "firebase/auth";
import { useStateValue } from "./StateProvider"; 
import { actionTypes } from './reducer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, dispatch] = useStateValue();

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        dispatch({
          type: actionTypes.SET_USER,
          user,
        });
      }
    } catch (error) {
      console.error("Error handling redirect result:", error);
    }
  };

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Google auth error", errorCode, errorMessage);
    });
  };
  
  const handleSignInClick = (e) => {
    e.preventDefault();
    login(e);
  };

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: userCredential.user,
        });
      })
      .catch((error) => {
        console.error("Authentication error code:", error.code);
        console.error("Authentication error message:", error.message);
        alert(`Authentication failed: ${error.message}`);
      });
  };


  useEffect(() => {
    handleRedirectResult();
  }, [handleRedirectResult]);


  return (
    
    <div className='login-box'>
      <form onSubmit={login}>
        <div className='user-box'>
          <input type='text' id="email" required value={email} onChange={e => setEmail(e.target.value)}></input>
          <label htmlFor="email">Email</label>
        </div>
        <div className='user-box'>
          <input type='password' id="password" required value={password} onChange={e => setPassword(e.target.value)}></input>
          <label htmlFor="password">Password</label>
        </div>
        <center>
          {/* <button onClick={handleSignInClick}>SEND</button> */}
            <a onClick={handleSignInClick}>SEND<span></span></a>
        </center>
        <center>
          {/* <button onClick={signInWithGoogle}>Sign In with Google</button> */}
        <a onClick={signInWithGoogle}>Sign In with Google<span></span></a>
        </center>
      </form>
    </div>
  )
};
export default Login;