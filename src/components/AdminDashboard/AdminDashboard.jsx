import React from 'react';
import './AdminDashboard.css';
import SecureMedicalRecordsUploads from './SecureMedicalRecordsUploads';
import ReportPDFGeneration from './ReportPDFGeneration';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <SecureMedicalRecordsUploads />
            <ReportPDFGeneration />
        </div>
    );
};

export default AdminDashboard;
