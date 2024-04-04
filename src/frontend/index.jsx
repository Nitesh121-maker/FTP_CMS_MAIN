import React,{useEffect, useState} from 'react'
import Header from  "./header"
import "../css/index.css"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faCalendar,faUser,faPerson } from '@fortawesome/free-solid-svg-icons';
import Profile from  "./profile"
import Allclients from "./Clients"
import Calender from "./Calendar"

function Index() {
    const [isclientform, setClientForm] = useState(true)
    const [isclientTable, setClientTable] = useState(true)
    const [isProfileHidden, setProfileHidden] = useState(false)
    const [isAllclientHidden, setAllclientHidden] = useState(false)
    const [isCalenderHidden, setCalenderHidden] = useState(false)
    const [message, setMessage] = useState("");
    const [clients, setClientdata] = useState("");
    function showProfile() {
        setProfileHidden(true);
        setClientTable(false);
        setClientForm(false);
        setAllclientHidden(false);
        setCalenderHidden(false);
    }
    function showAllClients() {
        setProfileHidden(false);
        setClientTable(false);
        setClientForm(false);
        setCalenderHidden(false);
        setAllclientHidden(true);
    }
    function showCalander() {
        setProfileHidden(false);
        setClientTable(false);
        setClientForm(false);
        setAllclientHidden(false);
        setCalenderHidden(true);
    }


    const[formData,setFormData] = useState({
        clientName:"",
        clientEmail:"",
        clientStatus: "Active",
        clientPassword:"",
      });
      const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
      };
    //   Client Create
      const handleClient = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('http://192.168.1.7:3002/client', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Client added successfully
            const data = await response.json();
            setMessage(data.message);
            setTimeout(() => {
                // Reload the page after 2 seconds
                window.location.reload();
              }, 5000);
          } else {
            // Handle other cases, e.g., client already exists
            const data = await response.json();
            setMessage(data.message || 'Error adding client');
          }
        } catch (error) {
          // Handle registration error
          console.error('Registration error', error);
          setMessage('Error adding client');
        }
      };

      useEffect(() => {
        // Fetch data from the /clients endpoint
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.1.7:3002/clientdata');
            // const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();
              setClientdata(data);
          } catch (error) {
            console.error('Error fetching client data:', error);
          }
        };
    
        fetchData();
      }, []);

      const navigate = useNavigate();

      const handleViewClick = (client) => {
        // Log clicked client data
        console.log('Clicked Client:', client);
    
        // Navigate to ClientProfile route programmatically
        navigate(`/ClientProfile/${client.clientId}`, {
          state: {
            clientName: client.clientName,
            clientEmail: client.clientEmail,
          },
        });
      };
  return (
    <>
        <Header/>
        <div className="main">
            <div className="sidewrap">
                <div className="sidebar">
                    <div className="sidebar-list">
                        <li> <FontAwesomeIcon icon={faDashboard} /><a href="/">Dashboard</a></li>
                    </div>
                    <div className="sidebar-list">
                        <li><FontAwesomeIcon icon={faCalendar}/><a href="#Calender" onClick={showCalander}>Calendar</a></li>
                    </div>
                    <div className="sidebar-list">
                        <li><FontAwesomeIcon icon={faUser}/><a href="#Profile" onClick={showProfile}>Profile</a></li>
                    </div>
                    <div className="sidebar-list">
                        <li><FontAwesomeIcon icon={faPerson}/><a href="#Clients" onClick={showAllClients}>Clients</a></li>
                    </div>
                </div> 
            </div>
            <div className="functions">
                {isclientform &&
                    <div className="add-client-form">
                        <form method='post' onSubmit={handleClient}>
                        {message && <p className='error'>{message}</p>}
                        <h2>Add Client</h2>

                        <div className="form-group">
                            <label formData="clientName">Client Name:</label>
                            <input type="text" id="clientName" name="clientName"value={formData.clientName} onChange={handleChange} required/>
                        </div>

                        <div className="form-group">
                            <label formData="clientEmail">Client Email:</label>
                            <input type="email" id="clientEmail" name="clientEmail"value={formData.clientEmail} onChange={handleChange} required/>
                        </div>
                        <input type="text" id="clientStatus" name="clientStatus" value={formData.clientStatus} hidden/>
                        <div className="form-group">
                            <label formData="clientPassword">Password:</label>
                            <input type="password" id="clientPassword" name="clientPassword"value={formData.clientPassword} onChange={handleChange} required/>
                        </div>
                        <button type="submit" className="add-client-btn">
                            <span className="btn-text">Add Client</span>
                        </button>
                        </form>
                    </div>
                }
                {isclientTable &&
                    <div className="clients">
                        <h3>Recent Client</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(clients) && clients.length > 0 ? (
                                clients.map((client) => (
                                <tr key={client.clientId}>
                                    <td>{client.clientName}</td>
                                    <td>{client.clientEmail}</td>
                                    <td>{client.clientStatus}</td>
                                    <td>{client.created_at}</td>
                                    <button onClick={() => handleViewClick(client)} className='view-btn'>View</button>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="4">No clients available</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                }
                <div className="profile">
                {isProfileHidden && <Profile />}
                </div>
                <div className="Allclient">
                    {isAllclientHidden && <Allclients/>}
                </div>
                <div className="calender">
                    {isCalenderHidden && <Calender/>}
                </div>
            </div>
        </div>
  
    </>
  )
}

export default Index