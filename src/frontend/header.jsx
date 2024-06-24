import React  from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/header.css"
import axios from 'axios'; 
function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post('https://ftp-admin-server.vercel.app/admin-logout');

      if (response.status === 200) {
        localStorage.removeItem('userData');
        // Logout successful, navigate to login page
        navigate('/Login');
      } else {
        // Handle other status codes if needed
        console.error('Logout error:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div className="nav">
        <nav>
            <h1>Tradeimex</h1>
          
            <button class="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    </div>
  )
}

export default Header