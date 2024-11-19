import React, { useState } from 'react';
import { Phone, Mail, Globe, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Will handle submit')
  }
  return (
    <div className="bg-primary min-h-screen p-6">
      <h1 className="text-4xl text-center font-bold text-white drop-shadow-[6px_6px_6px_rgba(0,0,0,1)] mb-8">
        Contact Us
      </h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]">
        {/* contact info */}
        <div className="md:col-span-3 bg-secondary text-white rounded-lg p-6 h-fit">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="shrink-0" />
              <p>(+44) 7585-630176</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="shrink-0" />
              <p>hello@zstudio.com</p>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="shrink-0" />
              <p>www.zstudio.com</p>
            </div>
          </div>
        </div>

        {/* form contact */}
        <div className="md:col-span-6 bg-secondary rounded-lg p-8 ">
          <form 
            onSubmit={handleSubmit}
            className="space-y-4 "
          >
            <input
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              onChange={handleChange}
              type="email"
              placeholder="E-mail"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              onChange={handleChange}
              type="tel"
              placeholder="Phone"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Subject"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <textarea
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-3 rounded-lg border border-gray-300 h-32 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type='submit'
              className="w-full bg-primary text-white py-3 rounded-md hover:scale-110 transition-transform duration-200 font-md drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]">
              Send Message
            </button>
          </form>
        </div>

        {/* text */}
        <div className="md:col-span-3 bg-secondary text-white rounded-lg p-6 h-fit">
          <p className="leading-relaxed">
            Our team will get back to you within 24-48 hours during business hours, Monday through Friday.
          </p>
        </div>
      </div>

      {/* scial media */}
  <div className="flex justify-center gap-6 mt-12 drop-shadow-[6px_6px_6px_rgba(255,255,255,1)]">
    <a
      href="#"
      className="text-white hover:scale-110 transition-transform duration-200 bg-secondary p-2 
        rounded-full hover:text-primary hover:drop-shadow-[6px_6px_6px_rgba(0,0,0,1)]"
    >
      <Facebook size={24} />
    </a>
    <a
      href="#"
      className="text-white hover:scale-110 transition-transform duration-200 bg-secondary p-2 
        rounded-full hover:text-primary hover:drop-shadow-[6px_6px_6px_rgba(0,0,0,1)]"
    >
      <Instagram size={24} />
    </a>
    <a
      href="#"
      className="text-white hover:scale-110 transition-transform duration-200 bg-secondary p-2 
        rounded-full hover:text-primary hover:drop-shadow-[6px_6px_6px_rgba(0,0,0,1)]"
    >
      <Twitter size={24} />
    </a>
    <a
      href="#"
      className="text-white hover:scale-110 transition-transform duration-200 bg-secondary p-2 
        rounded-full hover:text-primary hover:drop-shadow-[6px_6px_6px_rgba(0,0,0,1)]"
    >
      <Linkedin size={24} />
    </a>
</div>

    </div>
  );
};

export default Contact;