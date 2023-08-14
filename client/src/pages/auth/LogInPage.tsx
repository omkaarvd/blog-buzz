import axios from 'axios';
import React, { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../redux/Store';
import { logIn } from '../../redux/slice/UserSlice';
import { AuthResponse } from '../../types/types';

const LogInPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const response = await axios.post<AuthResponse>(
        'http://localhost:1437/api/user/login',
        { email, password }
      );

      if (response.status === 200) {
        localStorage.setItem('user', response.data.token);
        dispatch(logIn({ ...response.data }));
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className='mx-auto my-16 max-w-md rounded-md bg-[#fff] p-12'
    >
      <h1 className='mb-4 text-3xl font-bold'>Login</h1>
      <div className='mb-4'>
        <label htmlFor='email' className='mb-2 text-lg'>
          Email
        </label>
        <input
          type='email'
          id='email'
          className='mb-2 mt-1 w-full rounded-md border border-[#ddd] p-1'
          ref={emailRef}
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='password' className='mb-2 text-lg'>
          Password
        </label>
        <input
          type='password'
          id='password'
          className='mb-2 mt-1 w-full rounded-md border border-[#ddd] p-1'
          ref={passwordRef}
          required
        />
      </div>
      <button
        type='submit'
        className='w-full rounded-md bg-[#1aac83] px-4 py-2 font-semibold text-white hover:bg-[#0f9b7a]'
      >
        Login
      </button>
    </form>
  );
};

export default LogInPage;
