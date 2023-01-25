import React, { useState, useEffect, useCallback } from 'react';

import Loading from '../Loading/Loading';
import ShortPost from './ShortPost/ShortPost';

function Home() {

  const [posts, setPosts] = useState(undefined);

  const fetchPosts = useCallback(() => {
    fetch(process.env.REACT_APP_URL + '/posts', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        setPosts(result);
      })
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    if (!posts) {
      fetchPosts();
    }

    return () => {
      abortController.abort();
    }
  }, [fetchPosts, posts])

  if (!posts) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      {posts.map(post => (
        <ShortPost key={post._id} {...post} />
      ))}
    </div>
  )

}

export default Home;