import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUser from './admin/CreateUser';
import EditUser from './admin/EditUser';
import HomeAdmin from './admin/HomeAdmin';
import ListQuestions from './admin/ListQuestions';
import ListUsers from './admin/ListUsers';
import Login from './auth/Login';
import HomeStudent from './student/HomeStudent';
import './style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Login/>}/>
            <Route path="/adminHome" element = {<HomeAdmin/>}/>
            <Route path="/adminStudent" element = {<HomeStudent/>}/>
            <Route path="/listUsers" element = {<ListUsers/>}/>
            <Route path="/editUser/:id" element = {<EditUser/>}/>
            <Route path="/createUser" element = {<CreateUser/>}/>


            <Route path="/listQuestions" element = {<ListQuestions/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
 