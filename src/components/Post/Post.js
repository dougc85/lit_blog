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

  return (
    <div className="Post">
      <h2>{title}</h2>
      {showAuthOptions && <PostOptions post={post} setPost={setPost} />}
      {imageURL ? <img src={imageURL} alt={title} /> : null}
      <p>{dateToString(createdAt)}</p>
      <p>{body}</p>
      {(createdAt !== updatedAt) ?
        <p>UPDATED {dateToString(updatedAt)}</p> : null}
      {comments.map(comment => (
        <Comment key={comment._id} {...comment} postCreator={creator} postId={_id} setComments={setComments} />
      ))}
    </div>
  )
}

export default Post;