import React,{useState, useEffect} from 'react'
import "../css/clients.css"
import { useNavigate } from 'react-router'
import Editform from "./Clienteditform"
function Clients() {
    const [isEditForm, setEditForm] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clients, setClientdata] = useState("");
      // function showForm() {
      //   seteditForm(prevState => !prevState);
      // }
     // Fetch data from the /clients endpoint
      useEffect(() => {
       
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.1.10:3002/clientdata');
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
      const handleEditClick = (client) => {
        console.log('Clicked Client::', client);
        setSelectedClient(client);
        setEditForm(prevState => !prevState);
      };
    
      const editButtonClick = () => {
        if (selectedClient) {
          handleEditClick(selectedClient);
        }
      };
      
  return (

    <div className="Allclients">
       <div className="clients-main">
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
                            <td>
                                <button onClick={() => handleViewClick(client)} className='action-btn'>View</button>
                                <button  onClick={() => handleEditClick(client)}className="action-btn">Edit</button>
                                {/* <a href="#"  onClick={showForm} className="action-btn">Edit</a> */}
                                {/* <a href="/ClientProfile" className="action-btn">Download</a> */}
                            </td>
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
       <div className="cllient-edit-form">
         {isEditForm && selectedClient && (
          <Editform selectedClient={selectedClient} />
         )}
       </div>
    </div>
  )
}

export default Clients