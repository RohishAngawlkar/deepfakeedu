import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('https://genaiedu.pockethost.io/');

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('users').authWithPassword(email, password);
      console.log('Logged in successfully');
      navigate('/generative-media-question');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Assuming you have a route for forgot password
  };

  return (
    <>
      <Navbar />
      <div className="antialiased">
        <div className="flex items-center justify-center h-screen w-screen">
          <div className="space-y-5 text-center">
            <h1 className="font-bold text-6xl">
              Welcome Back!
            </h1>
            <p>
              Please log in to continue.
            </p>
            <div className='w-full'>
              <form className='space-y-4' onSubmit={handleLogin}>
                <div>
                  <label className='block text-2xl font-semibold' htmlFor='email'>Email:</label>
                  <input
                    type='email'
                    id='email'
                    className='w-2/5 rounded-full p-2 border border-gray-300'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className='block text-2xl font-semibold' htmlFor='password'>Password:</label>
                  <input
                    type='password'
                    id='password'
                    className='w-2/5 rounded-full p-2 border border-gray-300'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <div>
                  <Button type='submit'>Log In</Button>
                </div>
              </form>
              <div className="mt-4">
                <button
                  onClick={handleForgotPassword}
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
