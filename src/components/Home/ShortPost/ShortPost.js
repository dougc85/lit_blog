import React, { useContext } from 'react';
import './ShortPost.css';
import { Link } from 'react-router-dom';
import dateToString from '../../../helper/dateToString';
import AuthContext from '../../../context/auth-context';

function ShortPost(props) {
  const {
    title,
    body,
    published,
    createdAt,
    imageURL,
    comments,
    _id,
    creator
  } = props;

  const {
    authObject
  } = useContext(AuthContext);

  let moreText = 'read more...';
  let showAuthInfo;

  if (authObject && (creator === authObject.userId)) {
    moreText = 'read/edit post';
    showAuthInfo = true;
  }

  if (!published && !showAuthInfo) {
    return;
  }

  return (
    <div className="ShortPost">
      {showAuthInfo && (
        published ?
          null :
          <p>Unpublished</p>
      )}
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
      <Link to={`/${_id}/${title}`}>{moreText}</Link>
    </div>
  )
}

export default ShortPost;