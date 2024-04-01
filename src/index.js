import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css';
// import "../../Firebase/firebase";
import Dashboard from './frontend/index';
import ClientProfile from './frontend/ClientsProfile'
import Login from './frontend/Login';
import Registeration from './frontend/Registeration';
// import reportWebVitals from './reportWebVitals';

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-dashboard" element={<Dashboard/>}></Route>
        <Route path="/ClientProfile/:clientId" element={<ClientProfile/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path='/Register' element={<Registeration/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'));