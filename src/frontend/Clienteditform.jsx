import React,{useEffect,useState} from 'react'
import "../css/index.css"
function Clienteditform({ selectedClient  }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
     const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        clientStatus: 'Active', // Assuming default value is 'Active'
        clientPassword: '',
      });
    
      // Update form data when selectedClient  changes
      useEffect(() => {
        if (selectedClient ) {
          setFormData({
            clientName: selectedClient .clientName || '',
            clientEmail: selectedClient .clientEmail || '',
            clientStatus: selectedClient .clientStatus || 'Active',
            clientPassword:selectedClient .clientPassword|| '', 
          });
        }
      }, [selectedClient ]);
      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Example: Update client data on the server
        try {
          setLoading(true);
          const response = await fetch(`http://192.168.1.5:3002/edit-client/${selectedClient.clientId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setSuccessMessage(result.message);
          setLoading(false);
        } catch (error) {
          console.error('Error updating client data:', error);
        }
      };
      useEffect(() => {
        if (successMessage) {
          // Automatically refresh the browser after 5 seconds
          const timeoutId = setTimeout(() => {
            window.location.reload();
          }, 5000);
    
          // Clear the timeout when the component is unmounted or when successMessage changes
          return () => clearTimeout(timeoutId);
        }
      }, [successMessage]);
  return (
    <div>
        <div className="add-client-form">
            <form onSubmit={handleSubmit} method='post'>
              {loading && (
                <div className="progress-container">
                  <div className="progress-bar"></div>
                </div>
              )}

              {successMessage && <p className='edit-sucess-message'>{successMessage}</p>}
                <h2>Edit Client Profile</h2>

                <div className="form-group">
                    <label htmlFor="clientName">Client Name:</label>
                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                      
                     />
                </div>

                <div className="form-group">
                    <label htmlFor="clientEmail">Client Email:</label>
                    <input
                        type="text"
                        id="clientEmail"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleInputChange}
                      
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="clientStatus">Client Status:</label>
                    <select
                      name="clientStatus"
                      id="clientStatus"
                      value={formData.clientStatus}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="clientPassword">Password:</label>
                    <input
                        type="text"
                        id="clientPassword"                        
                        name="clientPassword"
                        value={formData.clientPassword}
                        onChange={handleInputChange}                     
                      />
                </div>
                <button type="submit" className="add-client-btn">
                    <span className="btn-text">Edit Client</span>
                </button>
            </form>
        </div>
    </div>
  )
}

export default Clienteditform