import React, { useState, useEffect } from 'react';

function Home() {

  const [posts, setPosts] = useState(undefined);

  const fetchPosts = () => {

  }

  useEffect(() => {
    const abortController = new AbortController();



    return () => {
      abortController.abort();
    }
  }, [])
  return (
    <div>

    </div>
  )

}

export default Home;