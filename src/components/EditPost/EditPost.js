import React, { useState, useContext, useEffect, useCallback } from 'react';
import './EditPost.css';
import Loading from '../Loading/Loading';
import AuthContext from '../../context/auth-context';

import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [post, setPost] = useState(undefined);

  const {
    authObject,
    checkExpire,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();



  const fetchPost = useCallback(() => {

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authObject) {
      headers.Authorization = 'Bearer ' + authObject.token
    }

    fetch(process.env.REACT_APP_URL + `/posts/${params.postId}`, {
      headers
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.error) {
          throw new Error(result.message);
        }
        setPost(result);
        setTitle(result.title);
        setBody(result.body);
        setImageURL(result.imageURL);
      })
      .catch(err => {
        console.log(typeof err, 'here');
      })
  }, [params.postId, authObject]);

  useEffect(() => {
    const abortController = new AbortController();

    if (!post) {
      fetchPost();
    }

    return () => {
      abortController.abort();
    }
  }, [post, fetchPost])

  if (!post) {
    return (
      <Loading />
    )
  }

  if (checkExpire()) {
    navigate('/admin/signin');
    return;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authObject) {
      headers.Authorization = 'Bearer ' + authObject.token
    }

    fetch(process.env.REACT_APP_URL + `/posts/${params.postId}`, {
      method: 'PATCH',
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
          navigate(`/${params.postId}/${params.postTitle}`);
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
        <label htmlFor="edit-post-title">Title</label>
        <input id="edit-post-title" name="title" onChange={handleInput} value={title} />
        <label htmlFor="edit-post-body">Body</label>
        <textarea id="edit-post-body" rows="12" name="body" onChange={handleInput} value={body} />
        <label htmlFor="edit-post-imageUrl">Image Url (optional)</label>
        <input id="edit-post-imageUrl" name="imageURL" onChange={handleInput} value={imageURL} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default EditPost;