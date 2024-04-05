import React, { useState, useEffect } from 'react';
import "../css/ClientProfile.css";
import Header from  "./header";
import "../css/index.css";
import { useLocation,useParams  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

function ClientsProfile() {
  const [message, setMessage] = useState("");
  const {  clientId } = useParams();
  const location = useLocation();
  const { clientName,clientEmail } = location.state || {};
  const [isUploading, setIsUploading] = useState(false);


  const [fileType, setFileType] = useState('');
  const [fileMonth, setFileMonth] = useState('');
  const [file, setFile] = useState(null);
  const [isUploadedfiles, setUploadedFiles] =useState(true);
  const [isDownloadedfiles, setDownloadedFiles] =useState(false);
  const [ischat, setChat] =useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('clientId', clientId);
      formData.append('clientName', clientName);
      formData.append('clientEmail', clientEmail);
      formData.append('fileType', fileType);
      formData.append('fileMonth', fileMonth);
      formData.append('file', file);

      const response = await fetch('http://192.168.1.5:3002/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('File Uploaded Successfully');
        setTimeout(() => {
            window.location.reload();
          }, 5000);
      } else {
        // Handle other cases, e.g., client already exists
        const data = await response.json();
        setMessage(data.message || 'Error adding client');
      }
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
    }
  };
  function showDownloaded() {
    setDownloadedFiles(true);
    setUploadedFiles(false);
    setChat(false);
  }
  function showUloaded() {
    setUploadedFiles(true);
    setDownloadedFiles(false);
    setChat(false);
  }
  function chat() {
    setChat(true);
    setUploadedFiles(false);
    setDownloadedFiles(false);

  }
  // Uploaded data
  const [fileData, setFileData] = useState([]);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.5:3002/getFileData/${clientId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Data from server:', data); // Log the received data
          setFileData(data);
        } else {
          console.error('Error fetching file data');
        }
      } catch (error) {
        console.error('Error fetching file data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  
  return (
    <div className="main-container">
      <Header />
      <div className="main-body">
        <div className="sidebar">
          <div className="sidebar-list">
            <li> <FontAwesomeIcon icon={faDashboard} /><a href="/admin-dashboard">Dashboard</a></li>
          </div>
        </div> 

        <div className="container">
          {clientId && (
            <div className="client-details">
              <h3>Name: {clientName}</h3>
              <h4><span>Email:  </span> {clientEmail}</h4>
            </div>
          )}
          {isUploading && 
            <><div className="loader"></div>
            <h3>Uploading...</h3></>
          }
          <h1>File Upload Page</h1>
          {message && <p>{message}</p>}
          <form onSubmit={handleFormSubmit}>
                <div className="assignment-options">
                  <select name="datatype" value={fileType} onChange={(e) => setFileType(e.target.value)}>
                    <option value="">Select Data Type</option>
                    <option value="import">Import</option>
                    <option value="export">Export</option>
                  </select>

                  <select value={fileMonth} onChange={(e) => setFileMonth(e.target.value)}>
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month} >{month}</option>
                    ))}
                  </select>
                  <label htmlFor="fileInput" className="file-label">
                    Upload File
                  </label>
                  <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} disabled={isUploading} />
                </div>
                <button type="submit" className='upload-files'>Upload Files</button>
          </form>
          <div className="line"></div>
          {/* <div className="file-details" id="fileDetails">
            <h3>Uploaded File Details</h3>
            <p><strong>File Name:</strong> ExampleFile.pdf</p>
            <p><strong>File Size:</strong> 2.5 MB</p>
            <p><strong>Uploaded On:</strong> January 1, 2023</p>
          </div> */}
          <div className="toogle-btn">
            <button className='uploaded-files' onClick={showUloaded}>Uploaded Files</button>
            <button className='downloaded-files'onClick={showDownloaded}>Downloaded Files</button>
            <button className='downloaded-files'onClick={showDownloaded}>Client Report</button>
            <button className='downloaded-files'onClick={chat}>Chat</button>
          </div>
          {isUploadedfiles&&
            <div className="Uploaded">
            <h1>Uploaded Files</h1>
            <table>
              <thead>
                <tr>
                  <th>File Type</th>
                  <th>Name</th>
                  <th>File Name</th>
                  <th>File Month</th>
                  <th>Upload Date</th>
                  <th>Upload Month</th>
                  <th>Upload Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(fileData) && fileData.length > 0 ? (
                fileData.map((file) => (
                  <tr key={file.uid}>
                    <td>{file.filetype}</td>
                    <td>{file.name}</td>
                    <td>{file.file_name}</td>
                    <td>{file.file_month}</td>
                    <td>{new Date(file.upload_date).toLocaleDateString()}</td>
                    <td>{file.upload_month}</td>
                    <td>{file.upload_year}</td>
                    <td><button className='btn-danger'>Delete</button></td>
                    
                  </tr>
                ))
              ): (
                <p>No data available.</p>
              )}
              </tbody>
            </table>
          </div>
          }
          {isDownloadedfiles &&
            <div className="downloaded">
            <h3>Downloaded File Details</h3>
            <table>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>File Size</th>
                  <th>Downloaded On</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ExampleFile.pdf</td>
                  <td>2.5 MB</td>
                  <td>January 1, 2023</td>
                </tr>
                <tr>
                  <td>ExampleFile.pdf</td>
                  <td>2.5 MB</td>
                  <td>January 1, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
          }
          {ischat &&
            <div className="chat-form-container" id='messageForm' >
              <label htmlFor="name">Message:</label>
              <div className="chat-messages">
                {/* Render chat messages here */}
              </div>
              <form className="chat-input-form">
                <input type="text" className="chat-input" placeholder="Type your message..." />
                <button type="submit" className="send-button">Send</button>
              </form>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ClientsProfile;
