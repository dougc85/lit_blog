import React, { useState, useContext } from 'react';
import './AddPost.css';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../../context/auth-context';

function AddPost() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageURL, setImageURL] = useState('');

  const {
    authObject
  } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authObject) {
      headers.Authorization = 'Bearer ' + authObject.token
    }

    // const lines = body.replace(/\r\n|\r|\n/, '\\n');
    // console.log(lines, 'lines');
    // console.log(lines.length, 'numLines');
    // const newBody = body.replace(/[\r\n]+/gm, "\\n");

    fetch(process.env.REACT_APP_URL + '/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        imageURL
      }),
      headers
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.error) {
          throw new Error(result.message);
        } else {
          console.log(result, 'result');
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }

  function handleInput(e) {
    let set =
      e.target.name === 'title' ? setTitle :
        e.target.name === 'body' ? setBody :
          setImageURL;

    set(e.target.value);
  }

  return (
    <div className="AddPost">
      <form>
        <label htmlFor="post-title">Title</label>
        <input id="post-title" name="title" onChange={handleInput} />
        <label htmlFor="post-body">Body</label>
        <textarea id="post-body" rows="12" name="body" onChange={handleInput} />
        <label htmlFor="post-imageUrl">Image Url (optional)</label>
        <input id="post-imageUrl" name="imageURL" onChange={handleInput} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default AddPost;