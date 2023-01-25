import React from 'react';
import './Comment.css';

import dateToString from '../../../helper/dateToString';

function Comment(props) {

  const {
    name,
    createdAt,
    body
  } = props;

  return (
    <div className="Comment">
      <div>
        <h3>{name}</h3>
        <p>POSTED ON {dateToString(createdAt)}</p>
        <p>{body}</p>
      </div>
    </div>
  )
}

export default Comment;