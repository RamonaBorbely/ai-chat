import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CharsGrouped from '../components/CharsGrouped';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-xl max-w-md w-full ">
        <CharsGrouped />
        <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-[6px_6px_6px_rgba(0,0,0,1)]">Create Account</h1>

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
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:scale-110 transition-transform duration-200"
          >
            Register
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