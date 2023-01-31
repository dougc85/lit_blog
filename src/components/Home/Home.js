import React, { useState, useEffect, useCallback, useContext } from 'react';
import './Home.css';

import Loading from '../Loading/Loading';
import ShortPost from './ShortPost/ShortPost';
import AuthContext from '../../context/auth-context';

function Home() {

  const [posts, setPosts] = useState(undefined);
  const {
    authObject
  } = useContext(AuthContext);

  const fetchPosts = useCallback(() => {

    const headers = {
      'Content-Type': 'application/json',
    };
    if (authObject) {
      headers.Authorization = 'Bearer ' + authObject.token
    }
    fetch(process.env.REACT_APP_URL + '/posts', {
      headers
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        setPosts(result);
      })
  }, [authObject]);

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
    <div className="Home">
      <div className="container">
        <div className="row">
          <div className="col-0 col-md-3">

          </div>
          <div className="col-12 col-md-9">
            {posts.map(post => (
              <ShortPost key={post._id} {...post} />
            ))}
          </div>
        </div>

      </div>

    </div>
  )

}

export default Home;