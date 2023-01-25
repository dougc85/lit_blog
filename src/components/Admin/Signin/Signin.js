import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../../context/auth-context';

function Signin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    setAuthObject
  } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleInput(e) {
    let set = e.target.name === 'email' ? setEmail : setPassword;
    set(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(process.env.REACT_APP_URL + '/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.error) {
          throw new Error(result.message);
        } else {
          const authObject = { ...result };
          authObject.expiresAt = Date.now() + 3600000;
          setAuthObject(authObject);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }

  return (
    <div>
      <form >
        <label htmlFor="signin-email">email</label>
        <input id="signin-email" type="email" name="email" value={email} onChange={handleInput} />
        <label htmlFor="signin-password">password</label>
        <input id="signin-password" type="password" name="password" value={password} onChange={handleInput} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signin;