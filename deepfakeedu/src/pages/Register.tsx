import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('https://genaiedu.pockethost.io/');

const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: confirmPassword, // Include passwordConfirm field
        username,
      });
      setSuccess('Registration successful. You can now log in.');
      setError('');
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="antialiased">
        <div className="flex items-center justify-center h-screen w-screen">
          <div className="space-y-5">
            <h1 className="text-center font-bold text-6xl">
              Create Your Account
            </h1>
            <p className="text-center">
              Please fill in the details to register.
            </p>
            <div className="w-full text-center">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-2xl font-semibold" htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="w-2/5 rounded-full p-2 border border-gray-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-2xl font-semibold" htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="w-2/5 rounded-full p-2 border border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-2xl font-semibold" htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="w-2/5 rounded-full p-2 border border-gray-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-2xl font-semibold" htmlFor="confirm-password">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-2/5 rounded-full p-2 border border-gray-300"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <Button type="submit" className="rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300">
                  Register
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
