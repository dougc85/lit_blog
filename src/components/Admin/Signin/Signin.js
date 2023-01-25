import React, { useState } from 'react';

function Signin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleInput(e) {
    let set = e.target.name === 'email' ? setEmail : setPassword;
    set(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log('first, here');

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
          //Handle token
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