import React from 'react';
import './PatientDashboard.css';
import AppointmentManagement from './AppointmentManagement';
import ChatWithDoctors from './ChatWithDoctors';
import VideoConsultation from './VideoConsultation';

const PatientDashboard = () => {
    return (
        <div className="patient-dashboard">
            <h1>Patient Dashboard</h1>
            <AppointmentManagement />
            <ChatWithDoctors />
            <VideoConsultation />
        </div>
    );
};

export default PatientDashboard;
