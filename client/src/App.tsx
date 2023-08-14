import axios from 'axios';
import React, { Suspense, useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppDispatch, useAppSelector } from './redux/Store';
import { logIn } from './redux/slice/UserSlice';
import { User } from './types/types';

const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./pages/home/Home'));
const PreHome = lazy(() => import('./pages/home/PreHome'));
const NotFound = lazy(() => import('./pages/error/NotFound'));
const CreateBlog = lazy(() => import('./pages/blog/CreateBlog'));
const SingleBlog = lazy(() => import('./pages/blog/SingleBlog'));
const LogInPage = lazy(() => import('./pages/auth/LogInPage'));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));
const EditBlog = lazy(() => import('./pages/blog/EditBlog'));
const Profile = lazy(() => import('./pages/user/Profile'));
const Loader = lazy(() => import('./components/Loader'));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userIsAuthorized = useAppSelector(
    (state) => state.user.value.isAuthorized
  );

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<User>(`http://localhost:1437/api/user`, {
        headers: {
          'x-access-token': localStorage.getItem('user'),
        },
        signal: controller.signal,
      })
      .then(({ data }) => {
        dispatch(logIn(data));
      })
      .catch((error: Error) => {
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense
        fallback={
          <div className='absolute left-2/4 top-2/4'>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path='/' element={userIsAuthorized ? <Home /> : <PreHome />} />

          {userIsAuthorized && <Route path='/user/:id' element={<Profile />} />}

          {!userIsAuthorized && (
            <Route path='/user'>
              <Route path='signup' element={<SignUpPage />} />
              <Route path='login' element={<LogInPage />} />
            </Route>
          )}

          {userIsAuthorized && (
            <Route path='/blog'>
              <Route path=':id' element={<SingleBlog />} />
              <Route path='create' element={<CreateBlog />} />
              <Route path='edit/:id' element={<EditBlog />} />
            </Route>
          )}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
