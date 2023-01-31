import React, { useState, useEffect, useCallback, useContext } from 'react';
import './Post.css';
import { useParams, Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import dateToString from '../../helper/dateToString';

import Comment from './Comment/Comment';
import Loading from '../Loading/Loading';
import PostOptions from '../PostOptions/PostOptions';

function Post(props) {

  const [post, setPost] = useState(undefined);
  const [comments, setComments] = useState(undefined);

  const [commentName, setCommentName] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseClass, setResponseClass] = useState('comment-error');

  const params = useParams();

  const {
    authObject
  } = useContext(AuthContext);

  let showAuthOptions;

  if (authObject && post && (post.creator === authObject.userId)) {
    showAuthOptions = true;
  }

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
        setComments(result.comments);
        setPost(result);
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
  }, [post, comments, fetchPost])

  if (!post) {
    return (
      <Loading />
    )
  }

  const {
    title,
    body,
    createdAt,
    updatedAt,
    imageURL,
    published,
    creator,
    _id
  } = post;

  if (!published && !showAuthOptions) {
    return (
      <Navigate replace to="/" />
    )
  }

  function handleInput(e) {

    setResponseMessage('');

    let set =
      e.target.name === 'name' ? setCommentName : setCommentBody;

    set(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authObject) {
      headers.Authorization = 'Bearer ' + authObject.token
    }

    fetch(process.env.REACT_APP_URL + `/posts/${params.postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        name: commentName,
        body: commentBody,
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
          setComments(oldComments => {
            const newComments = [...oldComments];
            newComments.push(result.post);
            return newComments;
          })
          setCommentBody('');
          setCommentName('');
          setResponseMessage(result.message);
          setResponseClass('comment-success');
        }
      })
      .catch(err => {
        setResponseMessage(err.message);
        setResponseClass('comment-error')
      })
  }

  return (
    <div className="Post mx-3">
      <div className="container">
        <div className="card mb-4">
          <div className="card-header">
            <h2>{title}</h2>
            <p className="mb-0">{dateToString(createdAt)}</p>
            {showAuthOptions && <PostOptions post={post} setPost={setPost} />}
            <small className="text-muted">{(createdAt !== updatedAt) ? 'UPDATED ' + dateToString(updatedAt) : null}</small>
          </div>
          <div className="card-body">
            <p>
              {imageURL ? <img className="me-4 mb-2" src={imageURL} alt={title} /> : null}
              {body}
            </p>

          </div>
        </div>
        <form className="container p-3 mb-5 col-12 col-md-8">
          <h3 className="text-center">Add a Comment</h3>
          {responseMessage && <p className={responseClass}>{responseMessage}</p>}
          <div className="mb-3">
            <label htmlFor="comment-name">Name</label>
            <input className="form-control" type="text" id="comment-name" name="name" onChange={handleInput} value={commentName} />
          </div>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="comment-body">Comment</label>
              <textarea className="form-control" id="comment-body" name="body" onChange={handleInput} value={commentBody} rows="8"></textarea>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary comment-button" onClick={handleSubmit}>Submit</button>
          </div>

        </form>
        {comments.map(comment => (
          <Comment key={comment._id} {...comment} postCreator={creator} postId={_id} setComments={setComments} />
        ))}
      </div>
    </div>
  )
}

export default Post;