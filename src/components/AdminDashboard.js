import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ShowPlayerModal = ({ selectedPlayers, onClose }) => (
  <Modal show={true} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Selected Players</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ul>
        {selectedPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formId, setFormId] = useState(null);

  const handleShowModal = (players) => {
    setSelectedPlayers(players);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPlayers([]);
    setShowModal(false);
    setFormId(null);
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('https://ipl2024.onrender.com/api/admin/forms', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setForms(data);
        } else {
          console.error('Failed to fetch forms:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching forms:', error);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      {forms.length === 0 ? (
        <p>No forms found</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Team Name</th>
                <th>Mobile Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map(form => (
                <tr key={form._id}>
                  <td>{form.name}</td>
                  <td>{form.teamName}</td>
                  <td>{form.mobileNumber}</td>
                  <td>
                    <Button onClick={() => handleShowModal([...form.selectedBatsmen, ...form.selectedBowlers, ...form.selectedAllRounders])}>
                      Show Players
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && <ShowPlayerModal selectedPlayers={selectedPlayers} onClose={handleCloseModal} />}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
