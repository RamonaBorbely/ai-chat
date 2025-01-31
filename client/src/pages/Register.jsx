import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CharsGrouped from '../components/CharsGrouped';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {signup} = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    } 

    try {
      setIsSubmitting(true);
      await signup(formData.email, formData.password, formData.name)
      navigate('/userDashboard');
    } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            setError('This email is already registrred');
            break;
            case 'auth/invalid-email':
              setError('Invalid email address');
              break;
            case 'auth/operation-not-allowed':
              setError('Email/password accounts are not enabled');
              break;
            case 'auth/weak-password':
              setError('Password is too weak');
              break;
          default:
            setError('Failed to create an account. Please try again');
        }
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-xl max-w-md w-full ">
        <CharsGrouped />
        <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-[6px_6px_6px_rgba(0,0,0,1)]">Create Account</h1>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
            { error }
          </div>
          
        )}

        <form onSubmit={handleSubmit} className="space-y-6 drop-shadow-[6px_6px_6px_rgba(255,255,255,0.5)]">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-lg focus:ring-2 focus:ring-primary "
              required
              disabled={isSubmitting}
            />
          </div>
          
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
          
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg focus:ring-2 focus:ring-primary"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-primary text-white py-3 rounded-lg font-medium 
              ${!isSubmitting && 'hover:scale-110'} transition-transform duration-200
              ${isSubmitting && 'opacity-70 cursor-not-allowed'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-white text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register