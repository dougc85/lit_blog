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

  const newBody = body.length > 800 ? body.slice(0, 800) + '...' : body;

  return (
    <div className="ShortPost container bg-white mb-3 py-3 px-4">
      {showAuthInfo && (
        published ?
          null :
          <p>Unpublished</p>
      )}
      <h2><Link className="link-primary" to={`/${_id}/${title}`}>{title}</Link></h2>
      <p className="">
        {dateToString(createdAt)}
      </p>
      <p className="lead">
        {imageURL ? <img className="me-4 mb-3" src={imageURL} alt={title} /> : null}
        {newBody}
      </p>
      <p>
        {comments.length + ' comments'}
      </p>
      <Link to={`/${_id}/${title}`}>{moreText}</Link>
    </div>
  )
}

export default ShortPost;