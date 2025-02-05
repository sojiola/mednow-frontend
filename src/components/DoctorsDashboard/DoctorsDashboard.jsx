import React from 'react';
import './DoctorsDashboard.css';
import AppointmentManagement from './AppointmentManagement';
import ChatWithPatients from './ChatWithPatients';
import VideoConsultationWithPatients from './VideoConsultationWithPatients';

const DoctorsDashboard = () => {
    return (
        <div className="doctors-dashboard">
            <h1>Doctors Dashboard</h1>
            <AppointmentManagement />
            <ChatWithPatients />
            <VideoConsultationWithPatients />
        </div>
    );
};

export default DoctorsDashboard;
