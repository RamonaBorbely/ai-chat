import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CharsGrouped from '../components/CharsGrouped';
import { useAuth } from '../context/AuthContext';

// TODO in this component
// remember me check box
// forgot password
// login with google
// some validation 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')

    try {
      setIsSubmitting(true)
      await login(formData.email, formData.password, )
      navigate('/userDashboard')
    } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            setError('Email address not found');
            break;
          case 'auth/wrong-password':
              setError('Incorrect password');
              break;
          case 'auth/invalid-email':
              setError('Invalid email address');
              break;
          case 'auth/user-disabled':
              setError('This account has been disabled');
              break;
          case 'auth/too-many-requests':
              setError('Too many failed attempts. Please try again later');
              break;
          default:
              setError('Failed to login. Please try again');
        }
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-xl max-w-md w-full">
        <CharsGrouped />
        <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-[6px_6px_6px_rgba(0,0,0,1)]">Welcome Back</h1>
        

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
            { error }
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 drop-shadow-[6px_6px_6px_rgba(255,255,255,0.5)]">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-lg focus:ring-2 focus:ring-primary"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-lg focus:ring-2 focus:ring-primary"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <button 
            type="submit"
            className={`w-full bg-primary text-white py-3 rounded-lg font-medium 
              ${!isSubmitting && 'hover:scale-110'} transition-transform duration-200
              ${isSubmitting && 'opacity-70 cursor-not-allowed'}`}            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loging in...' : 'Login'}
          </button>
        </form>

        <p className="text-white text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
           Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login