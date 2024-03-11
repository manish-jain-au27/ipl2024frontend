import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AdminDashboard = () => {
  const [forms, setForms] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formId, setFormId] = useState(null);
  const [editingForm, setEditingForm] = useState(null);

  const handleShowModal = (players, id) => {
    setSelectedPlayers(players);
    setShowModal(true);
    setFormId(id);
  };

  const handleCloseModal = () => {
    setSelectedPlayers([]);
    setShowModal(false);
    setFormId(null);
    setEditingForm(null);
  };

  const handleEditForm = async (formId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/forms/${formId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setEditingForm(data);
      setShowModal(true); // Show the modal with the form for editing
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    const fetchForms = async () => {
      const response = await fetch('http://localhost:3000/api/admin/forms', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      setForms(data);
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
                    <Button onClick={() => handleShowModal([...form.selectedBatsmen, ...form.selectedBowlers, ...form.selectedAllRounders], form._id)}>
                      Show Players
                    </Button>
                    <Button variant="info" onClick={() => handleEditForm(form._id)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" defaultValue={editingForm?.name} />
                </Form.Group>
                <Form.Group controlId="formTeamName">
                  <Form.Label>Team Name</Form.Label>
                  <Form.Control type="text" defaultValue={editingForm?.teamName} />
                </Form.Group>
                <Form.Group controlId="formMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" defaultValue={editingForm?.mobileNumber} />
                </Form.Group>
                {/* Add more form fields here */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditForm}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
