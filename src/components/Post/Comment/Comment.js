import React, { useContext } from 'react';
import './Comment.css';
import { useNavigate } from 'react-router-dom';

import dateToString from '../../../helper/dateToString';
import AuthContext from '../../../context/auth-context';

function Comment(props) {

  const {
    _id,
    name,
    createdAt,
    body,
    postCreator,
    postId,
    setComments
  } = props;

  const {
    authObject,
    checkExpire
  } = useContext(AuthContext);

  const navigate = useNavigate();

  let showAuthOptions;

  if (authObject && (postCreator === authObject.userId)) {
    showAuthOptions = true;
  }

  function handleDelete() {
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

    fetch(process.env.REACT_APP_URL + `/posts/${postId}/comments/${_id}`, {
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
          setComments((oldComments) => {
            const newComments = oldComments.filter(comment => {
              return (comment._id !== _id);
            })
            return newComments;
          })
        }
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }

  return (
    <div className="Comment border border-secondary rounded col-lg-8 offset-lg-2 col-12 offset-0 mb-4 p-3">
      <h3 className="mb-0">{name}</h3>
      <small className="text-muted">POSTED ON {dateToString(createdAt)}</small>
      <p className="mt-3">{body}</p>
      {showAuthOptions && <button onClick={handleDelete}>Delete Comment</button>}
    </div>
  )
}

export default Comment;