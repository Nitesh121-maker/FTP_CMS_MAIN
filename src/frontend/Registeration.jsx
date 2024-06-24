import React, { useState } from 'react'
import "../css/Registeration.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle  } from '@fortawesome/free-brands-svg-icons'
const Registeration = () => {
  const[formData,setFormData] = useState({
    fullname:"",
    email: "",
    password: ""
  });
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://ftp-admin-server.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Data::',data)
      // Handle success or show a message to the user
      console.log('Registration successful', data);
    } catch (error) {
      // Handle registration error
      console.error('Registration error', error);
    }
  };
  return (
    <div className="register-container">
        <form className="register-form" method='post' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname"value={formData.fillname} onChange={handleChange} required/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
            <button type="submit" className='register-submit'>Register</button>
            <p>or <a href="/Login">Login</a></p>
            {/* <a href="#" className="google-login"><FontAwesomeIcon icon={faGoogle} className='google-icon'/>Continue with Google</a> */}
        </form>
    </div>
  )
}

export default Registeration