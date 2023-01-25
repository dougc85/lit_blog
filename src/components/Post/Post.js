import React, { useState, useEffect, useCallback } from 'react';
import './Post.css';
import { useParams, Navigate } from 'react-router-dom';

import dateToString from '../../helper/dateToString';

import Comment from './Comment/Comment';
import Loading from '../Loading/Loading';

function Post(props) {

  const [post, setPost] = useState(undefined);
  const [comments, setComments] = useState(undefined);

  const params = useParams();

  const fetchPost = useCallback(() => {
    fetch(process.env.REACT_APP_URL + `/posts/${params.postId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result, 'result');
        setComments(result.comments);
        setPost(result);
      })
  }, [params.postId]);

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
  } = post;

  if (!published) {
    return (
      <Navigate replace to="/" />
    )
  }

  return (
    <div className="Post">
      <h2>{title}</h2>
      {imageURL ? <img src={imageURL} alt={title} /> : null}
      <p>{dateToString(createdAt)}</p>
      <p>{body}</p>
      {(createdAt !== updatedAt) ?
        <p>UPDATED {dateToString(updatedAt)}</p> : null}
      {comments.map(comment => (
        <Comment key={comment._id} {...comment} />
      ))}
    </div>
  )
}

export default Post;