import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import DoctorsDashboard from './components/DoctorsDashboard/DoctorsDashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import Login from './components/auth/Login';
//import Signup from './components/auth/Signup';
import Register from './components/auth/Register';
//import Profile from './pages/Profile'; // Import Profile component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login/>} /> {/* Added exact to avoid rendering on other routes */}
                <Route path="/patient-dashboard" element={<PatientDashboard/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/doctors" element={<DoctorsDashboard/>} />
            
            </Routes>
        </Router>
    );
};

export default App;