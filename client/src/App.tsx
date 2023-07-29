import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import PreHome from './pages/home/PreHome';
import NotFound from './pages/error/NotFound';
import CreateBlog from './pages/blog/CreateBlog';
import SingleBlog from './pages/blog/SingleBlog';
import LogInPage from './pages/auth/LogInPage';
import SignUpPage from './pages/auth/SignUpPage';
import EditBlog from './pages/blog/EditBlog';
import Profile from './pages/user/Profile';
import { AppDispatch, useAppSelector } from './redux/Store';
import { logIn } from './redux/slice/UserSlice';
import { User } from './types';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userIsAuthorized = useAppSelector(
    (state) => state.user.value.isAuthorized
  );

  useEffect(() => {
    axios
      .get<User>(`http://localhost:1437/api/user`, {
        headers: {
          'x-access-token': localStorage.getItem('user'),
        },
      })
      .then(({ data }) => {
        dispatch(logIn(data));
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={userIsAuthorized ? <Home /> : <PreHome />} />

        {userIsAuthorized && <Route path="/user/:id" element={<Profile />} />}

        {!userIsAuthorized && (
          <Route path="/user">
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LogInPage />} />
          </Route>
        )}

        {userIsAuthorized && (
          <Route path="/blog">
            <Route path=":id" element={<SingleBlog />} />
            <Route path="create" element={<CreateBlog />} />
            <Route path="edit/:id" element={<EditBlog />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
