import React from 'react';
import './ShortPost.css';
import { Link } from 'react-router-dom';
import dateToString from '../../../helper/dateToString';

function ShortPost(props) {
  const {
    title,
    body,
    published,
    createdAt,
    imageURL,
    comments,
    _id
  } = props;

  if (!published) {
    return;
  }

  return (
    <div className="ShortPost">
      <h2><Link to={`/${_id}/${title}`}>{title}</Link></h2>
      <p>
        {dateToString(createdAt)}
      </p>
      {imageURL ? <img src={imageURL} alt={title} /> : null}
      <p>
        {body}
      </p>
      <p>
        {comments.length + ' comments'}
      </p>
      <Link to={`/${_id}/${title}`}>read more...</Link>
    </div>
  )
}

export default ShortPost;