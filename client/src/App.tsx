import axios from 'axios';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppDispatch, useAppSelector } from './redux/Store';
import { logIn } from './redux/slice/UserSlice';
import { User } from './types';

const Navbar = React.lazy(() => import('./components/Navbar'));
const Home = React.lazy(() => import('./pages/home/Home'));
const PreHome = React.lazy(() => import('./pages/home/PreHome'));
const NotFound = React.lazy(() => import('./pages/error/NotFound'));
const CreateBlog = React.lazy(() => import('./pages/blog/CreateBlog'));
const SingleBlog = React.lazy(() => import('./pages/blog/SingleBlog'));
const LogInPage = React.lazy(() => import('./pages/auth/LogInPage'));
const SignUpPage = React.lazy(() => import('./pages/auth/SignUpPage'));
const EditBlog = React.lazy(() => import('./pages/blog/EditBlog'));
const Profile = React.lazy(() => import('./pages/user/Profile'));
const Loader = React.lazy(() => import('./components/Loader'));

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
      <Suspense
        fallback={
          <div className="absolute left-2/4 top-2/4">
            <Loader />
          </div>
        }
      >
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
