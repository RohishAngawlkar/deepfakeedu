import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { pb } from '@/lib/utils';
import { useCookies } from 'react-cookie'



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // @ts-ignore
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('users').authWithPassword(email, password).then((user) => {
        console.log(user?.token);

        navigate('/generative-media-question');
        setCookie('user', user?.token)

      });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  useEffect(() => {
    if (pb?.authStore?.isValid) navigate('/generative-media-question')
  })

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
                  <label className='block text-2xl font-semibold' htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    className='w-full rounded-full p-2 border border-gray-300 pl-5'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className='block text-2xl font-semibold' htmlFor='password'>Password</label>
                  <input
                    type='password'
                    id='password'
                    className='w-full rounded-full p-2 border border-gray-300 pl-5'
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
