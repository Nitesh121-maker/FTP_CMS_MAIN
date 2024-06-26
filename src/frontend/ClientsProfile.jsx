import React, { useState, useEffect } from 'react';
import "../css/ClientProfile.css";
import Header from  "./header";
import "../css/index.css";
import { useLocation,useParams  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ClientsProfile() {
  const [message, setMessage] = useState("");
  const {  clientId } = useParams();
  const location = useLocation();
  const { clientName,clientEmail, clientType } = location.state || {};
  const [isUploading, setIsUploading] = useState(false);


  const [fileType, setFileType] = useState('');
  const [fileMonth, setFileMonth] = useState('');
  const [file, setFile] = useState(null);
  const [isUploadedfiles, setUploadedFiles] =useState(true);
  const [isDownloadedfiles, setDownloadedFiles] =useState(false);
  const [ischat, setChat] =useState(false);
  const[clientReport,setClientReport]=useState(false);

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
      
      console.log('clientName',clientName);
      console.log('clientEmail',clientEmail);
      console.log('clientEmail',clientEmail);
      console.log('fileMonth',fileMonth);
      console.log('File',formData);
      const response = await fetch('https://ftp-admin-server.vercel.app/upload', {
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
    setClientReport(false);
  }
  function showUloaded() {
    setUploadedFiles(true);
    setDownloadedFiles(false);
    setChat(false);
    setClientReport(false);
  }
  function chat() {
    setChat(true);
    setUploadedFiles(false);
    setDownloadedFiles(false);
    setClientReport(false);
  }
  function client_report() {
    setClientReport(true);
    setUploadedFiles(false);
    setDownloadedFiles(false);
    setChat(false);
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
        const response = await fetch(`https://ftp-admin-server.vercel.app/getFileData/${clientId}`);
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
  
  const handleDelete = async(clientId,file_name) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) {
      return; // If user cancels deletion, exit the function
    }  
     try {
         const response = await axios.post (`https://ftp-admin-server.vercel.app/delete/${clientId}/${file_name}`);
         window.location.reload(true);
     } catch (error) {
        console.error('Error deleting file :', error.message);
     }
  }
  
  
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
            <button className='downloaded-files'onClick={client_report}>Client Report</button>
            {/* <button className='downloaded-files'onClick={chat}>Chat</button> */}
          </div>
          {isUploadedfiles&&
            <div className="Uploaded">
            <h1>Uploaded Files</h1>
            <table className='clientProfileTables'>
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
                    <td><button className='btn-danger' onClick={()=>handleDelete(clientId,file.file_name)}>Delete</button></td>
                    
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
            <table className='clientProfileTables'>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Download Status</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(fileData) && fileData.length > 0 ? (
                fileData.map((file) => (
                  <tr key={file.uid}>
                    <td>{file.file_name}</td>
                    <td>{file.download_status}</td>
                  </tr>
                ))
              ): (
                <p>No data available.</p>
              )}
              </tbody>
            </table>
          </div>
          }
          {clientReport &&
              <table className='clientProfileTables'>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Import Status</th>
                  <th>Export Status</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month, index) => {
                  // Find the files for the current month
                  const filesForMonth = fileData.filter(file => file.file_month === month);
                  console.log('Files For Month: ', filesForMonth);

                  // Filter files for import and export types
                  const importFiles = filesForMonth.filter(file => file.filetype === 'import');
                  const exportFiles = filesForMonth.filter(file => file.filetype === 'export');

                  return (
                    <tr key={index}>
                      <td>{month}</td>
                      <td>
                        {importFiles.length > 0 ? (
                          importFiles.map((file, i) => (
                            <div key={i}>{file.file_status}</div>
                          ))
                        ) : (
                          <div>Pending</div>
                        )}
                      </td>
                      <td>
                        {exportFiles.length > 0 ? (
                          exportFiles.map((file, i) => (
                            <div key={i}>{file.file_status}</div>
                          ))
                        ) : (
                          <div>Pending</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
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
