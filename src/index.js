import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Dashboard from './frontend/index';
import ClientProfile from './frontend/ClientsProfile'
import Login from './frontend/Login';
import Registeration from './frontend/Registeration';

export default function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/FTP_CMS_MAIN/admin-dashboard" element={<Dashboard />}></Route>
        <Route path="/FTP_CMS_MAIN/ClientProfile/:clientId" element={<ClientProfile />}></Route>
        <Route path="/FTP_CMS_MAIN/Login" element={<Login />}></Route>
        <Route path='/FTP_CMS_MAIN/Register' element={<Registeration />}></Route>
      </Routes>
    </Router>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))