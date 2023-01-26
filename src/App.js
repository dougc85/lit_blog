import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './components/Home/Home';
import Post from './components/Post/Post';

import Admin from './components/Admin/Admin';
import Signin from './components/Admin/Signin/Signin';
import AddPost from './components/Admin/AddPost/AddPost';
import EditPost from './components/EditPost/EditPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Home />} />
          <Route path="admin/">
            <Route index element={<Admin />} />
            <Route path="signin" element={<Signin />} />
            <Route path="addpost" element={<AddPost />} />
          </Route>
          <Route path=":postId/:postTitle" element={<Post />} />
          <Route path=":postId/:postTitle/edit" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
