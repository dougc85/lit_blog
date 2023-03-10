import React, { useContext } from 'react';
import './PostOptions.css';

import { useNavigate, useParams } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

function PostOptions(props) {

  const {
    post,
    setPost
  } = props;

  const {
    published,
    _id
  } = post;

  const navigate = useNavigate();
  const params = useParams();

  const {
    authObject,
    checkExpire,
  } = useContext(AuthContext);

  let publishText = post.published ? 'Click to Unpublish' : 'Click to Publish';

  function handlePublishing(e) {
    e.preventDefault();

    if (checkExpire()) {
      navigate('/admin/signin');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authObject) {
      headers.Authorization = 'Bearer ' + authObject.token
    }

    fetch(process.env.REACT_APP_URL + `/posts/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        published: !published
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
          setPost((oldPost) => {
            const newPost = { ...oldPost };
            newPost.published = !oldPost.published;
            return newPost;
          })
        }
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }

  function handleEdit(e) {
    e.preventDefault();

    navigate(`/${params.postId}/${params.postTitle}/edit`);
  }

  function handleDelete(e) {
    e.preventDefault();

    if (checkExpire()) {
      navigate('/admin/signin');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authObject) {
      headers.Authorization = 'Bearer ' + authObject.token
    }

    fetch(process.env.REACT_APP_URL + `/posts/${_id}`, {
      method: 'DELETE',
      headers
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.error) {
          throw new Error(result.message);
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }

  return (
    <div className="PostOptions">
      <button onClick={handlePublishing}>{publishText}</button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default PostOptions;