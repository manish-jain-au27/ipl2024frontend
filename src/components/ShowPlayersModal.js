import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ShowPlayersModal = ({ selectedPlayers, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Selected Players</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Batsmen:</h5>
        <ul>
          {selectedPlayers.filter(player => player.type === 'batsmen').map(player => (
            <li key={player.name}>{player.name}</li>
          ))}
        </ul>
        <h5>Bowlers:</h5>
        <ul>
          {selectedPlayers.filter(player => player.type === 'bowler').map(player => (
            <li key={player.name}>{player.name}</li>
          ))}
        </ul>
        <h5>All-Rounders:</h5>
        <ul>
          {selectedPlayers.filter(player => player.type === 'all-rounder').map(player => (
            <li key={player.name}>{player.name}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowPlayersModal;
