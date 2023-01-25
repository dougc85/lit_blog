import React from 'react';
import './PostOptions.css';

function PostOptions(props) {

  const {
    post,
    setPost
  } = props;

  const {
    title,
    body,
    createdAt,
    updatedAt,
    imageURL,
    published,
    _id
  } = post;

  let publishText = post.published ? 'Click to Unpublish' : 'Click to Publish';

  function handlePublishing(e) {
    e.preventDefault();

    fetch(process.env.REACT_APP_URL + `/posts/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        published: !published
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.error) {
          throw new Error(result.message);
        } else {
          setPost((oldPost) => {
            console.log(oldPost);
            const newPost = { ...oldPost };
            newPost.published = !oldPost.published;
            return newPost;
          })
          console.log(result, 'result');
        }
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }

  function handleEdit(e) {
    e.preventDefault();
  }

  function handleDelete(e) {
    e.preventDefault();
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