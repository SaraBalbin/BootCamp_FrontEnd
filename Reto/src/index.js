import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateQuestion from './admin/CreateQuestion';
import FormUser from './admin/FormUser';
import HomeAdmin from './admin/HomeAdmin';
import ListOptions from './admin/ListOptions';
import ListQuestions from './admin/ListQuestions';
import ListUsers from './admin/ListUsers';
import Login from './auth/Login';
import HomeStudent from './student/HomeStudent';
import SolveForm from './student/SolveForm';
import './style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element = {<Login/>}/>
            <Route path="/adminHome" element = {<HomeAdmin/>}/>
            <Route path="/listUsers" element = {<ListUsers/>}/>
            <Route path="/editUser/:id" element = {<FormUser type = 'editar'/>}/>
            <Route path="/createUser" element = {<FormUser type = 'crear'/>}/>
            <Route path="/createQuestion" element = {<CreateQuestion/>}/>
            <Route path="/listQuestions" element = {<ListQuestions/>}/>
            <Route path="/listOptions/:id" element = {<ListOptions/>}/>

            <Route path="/studentHome" element = {<HomeStudent/>}/>
            <Route path="/solveForm" element = {<SolveForm/>}/>

        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
 