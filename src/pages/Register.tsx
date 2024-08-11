import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { pb } from '@/lib/utils';

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  general?: string;
}

const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateUsername = (username: string): string | undefined => {
    if (!username) {
      return 'Username is required.';
    } else if (/\s/.test(username)) {
      return 'Username should not contain spaces.';
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is invalid.';
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    const passwordErrors = [];

    if (password.length < 8) {
      passwordErrors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push('Password must contain at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push('Password must contain at least one lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      passwordErrors.push('Password must contain at least one number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      passwordErrors.push('Password must contain at least one special character.');
    }

    return passwordErrors.length > 0 ? passwordErrors.join(' ') : undefined;
  };

  const validateConfirmPassword = (confirmPassword: string): string | undefined => {
    if (confirmPassword !== password) {
      return 'Passwords do not match.';
    }
    return undefined;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    const usernameError = validateUsername(value);
    setErrors((prevErrors) => ({ ...prevErrors, username: usernameError }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailError = validateEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const passwordError = validatePassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const confirmPasswordError = validateConfirmPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    try {
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: confirmPassword,
        username,
      });
      setSuccess('Registration successful. You can now log in.');
      setErrors({});
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      let errorMsg = 'Registration failed. Please try again.';

      // Specific error handling based on the error response
      if (err?.response?.data?.message) {
        const errorMessage = err.response.data.message;

        if (errorMessage.includes('already exists')) {
          setErrors({ email: 'User already exists.' });
          errorMsg = 'A user with this email already exists. Please try logging in or use a different email.';
        } else if (errorMessage.includes('invalid email')) {
          setErrors({ email: 'Invalid email address.' });
          errorMsg = 'The email address provided is not valid. Please enter a correct email address.';
        } else if (errorMessage.includes('weak password')) {
          setErrors({ password: 'Weak password.' });
          errorMsg = 'The password provided does not meet the requirements. Please use a stronger password.';
        } else if (errorMessage.includes('invalid username')) {
          setErrors({ username: 'Invalid username.' });
          errorMsg = 'The username provided is not valid. Please ensure it has no spaces or special characters.';
        }
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        general: errorMsg,
      }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="antialiased">
        <div className="flex items-center justify-center h-screen w-screen">
          <div className="space-y-5 w-full max-w-lg px-5">
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
                    className="w-full rounded-full p-2 border border-gray-300"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                  {errors.username && <p className="text-red-500">{errors.username}</p>}
                </div>
                <div>
                  <label className="block text-2xl font-semibold" htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-full p-2 border border-gray-300"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={!!errors.username}
                    required
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-2xl font-semibold" htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-full p-2 border border-gray-300"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={!!errors.email}
                    required
                  />
                  {errors.password ? (
                    <p className="text-red-500 break-words">{errors.password}</p>
                  ) : (
                    password.length === 0 && (
                      <ul className="text-sm text-gray-500">
                        <li>Password requirements:</li>
                        <li>- At least 8 characters long</li>
                        <li>- At least one uppercase letter</li>
                        <li>- At least one lowercase letter</li>
                        <li>- At least one number</li>
                        <li>- At least one special character (e.g., !@#$%^&*)</li>
                      </ul>
                    )
                  )}
                </div>
                <div>
                  <label className="block text-2xl font-semibold" htmlFor="confirm-password">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full rounded-full p-2 border border-gray-300"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    disabled={!!errors.password}
                    required
                  />
                  {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                </div>
                {errors.general && <p className="text-red-500">{errors.general}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <Button type="submit" className="rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300" disabled={!!errors.confirmPassword}>
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
