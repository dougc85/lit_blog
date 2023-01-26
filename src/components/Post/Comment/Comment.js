import React, { useContext } from 'react';
import './Comment.css';

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
    authObject
  } = useContext(AuthContext);

  let showAuthOptions;

  if (authObject && (postCreator === authObject.userId)) {
    showAuthOptions = true;
  }

  function handleDelete() {
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
          console.log(result, 'result');
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
    <div className="Comment">
      <div>
        <h3>{name}</h3>
        <p>POSTED ON {dateToString(createdAt)}</p>
        <p>{body}</p>
        {showAuthOptions && <button onClick={handleDelete}>Delete Comment</button>}
      </div>
    </div>
  )
}

export default Comment;