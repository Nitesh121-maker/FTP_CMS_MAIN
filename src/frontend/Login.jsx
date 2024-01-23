import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle  } from '@fortawesome/free-brands-svg-icons'
function Login() {
  const navigate = useNavigate();
  const [isLogedIn, setIslogedin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.1.7:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIslogedin(true);
        // Navigate to the desired route
        const { username, password } = await response.json();
        console.log("username", username);
        navigate('/');
      } else {
        // Handle non-OK responses
        console.error('Login error', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error', error);
    }
  };

  if (!isLogedIn) {
    console.log('Not logged in');
  }
  return (
    <div className="login-container">
        <form className="login-form" method='post' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.clientid} onChange={handleChange} required/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
            <button type="submit" className='login-btn'>Login</button>
            <p>or <a href="Register">Register</a></p>
            <a href="#" className="google-login"><FontAwesomeIcon icon={faGoogle} className='google-icon'/>Continue with Google</a>
        </form>
    </div>
  )
}

export default Login