import React, { useState } from 'react';
import '../styles/testdrives.css';

export default function TestDrives() {
  const [drives, setDrives] = useState([
    { id: 1, name: "Rajesh Patel", phone: "+91 98765 43210", car: "Hyundai Tucson", time: "Tomorrow, 11:00 AM", status: "Scheduled", feedback: "" },
    { id: 2, name: "Sneha Mehta", phone: "+91 99887 76655", car: "Hyundai Verna", time: "13 Feb, 2:00 PM", status: "Scheduled", feedback: "" }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setDrives(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleFeedback = (id, text) => {
    setDrives(prev => prev.map(d => d.id === id ? { ...d, feedback: text } : d));
  };

  const handleComplete = (name) => {
    alert(`Test Drive for ${name} marked as Completed! Data saved to P&P Tech Hub system.`);
  };

  return (
    <div className="testdrive-container animate-fade-in">
      <div className="header-box">
        <h2>Test Drive Handling</h2>
        <p className="sub-text">Confirm bookings and update customer drive feedback.</p>
      </div>

      <div className="drive-grid">
        {drives.map((drive) => (
          <div key={drive.id} className="drive-card">
            <div className="card-top">
              <div>
                <h3>{drive.name}</h3>
                <small>{drive.phone}</small>
              </div>
              <span className="car-tag">{drive.car}</span>
            </div>
            
            <div className="schedule-info">
              📅 <strong>Scheduled:</strong> {drive.time}
            </div>

            <button className="btn-call-action" onClick={() => alert(`Calling ${drive.name}...`)}>
              📞 Call to Confirm
            </button>

            <div className="input-group">
              <label>Drive Status</label>
              <select 
                value={drive.status} 
                onChange={(e) => handleStatusChange(drive.id, e.target.value)}
              >
                <option>Scheduled</option>
                <option>Completed</option>
                <option>No Show</option>
              </select>
            </div>

            <div className="input-group">
              <label>Drive Feedback</label>
              <textarea 
                rows="2" 
                placeholder="Enter customer experience..."
                value={drive.feedback}
                onChange={(e) => handleFeedback(drive.id, e.target.value)}
              ></textarea>
            </div>

            <button className="btn-save-drive" onClick={() => handleComplete(drive.name)}>
              Update Drive Result
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}