import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    teamName: '',
    mobileNumber: '',
    selectedBatsmen: [],
    selectedBowlers: [],
    selectedAllRounders: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [error, setError] = useState('');

  const batsmen = ['YASHASVI JAISWAL', 'SHIMRON HETMYER', 'ROVMAN POWELL', 'SANJU SAMSON', 'JOS BUTTLER', 'FAF DU PLESSIS', 'KOHLI', 'RAJAT PATIDAR', 'DINESH KARTIK', 'ANUJ RAWAT', 'SHIKHAR DHAWAN', 'RILEE ROSSOUW', 'JONNY BAIRSTOW', 'JITESH SHARMA', 'PRABHSIMRAN SINGH', 'DEVDUTT PADIKKAL', 'QUINTON DE KOCK', 'K L RAHUL', 'NICHOLAS POORAN', 'SUBHAM GILL', 'DAVID MILLER', 'SAI SUDARSHAN', 'KANE WILLAMSON', 'MATTHEW WADE', 'SHREYAS IYER', 'NITISH RANA', 'JASON RAY', 'RINKU SINGH', 'GURBAZ', 'RUTURAJ GAIKWAD', 'AJINKYA RAHANE', 'DEVON CONWAY', 'DHONI', 'GLENN PHILIPS', 'MARKRAM', 'RAHUL TRIPATHI', 'TRAVIS HEAD', 'MAYANK AGARWAL', 'HEINRICH KLAASEN', 'ROHIT SHARMA', 'TIM DAVID', 'SURYAKUMAR YADAV', 'TILAK VARMA', 'DEWALD BREVIS', 'ISHAN KISHAN'];

  const bowlers = ['AVESH KHAN', 'TRENT BOULT', 'YUZVENDRA CHAHAL', 'ADAM ZAMPA', 'PRASIDH KRISHNA', 'REECE TOPLEY', 'ALZARI JOSHEP', 'MOHAMMED SIRAJ', 'AKASHDEEP', 'LOCKIE FEGURSON', 'NATHAN ELLIS', 'RAHUL CHAHAR', 'KAGISO RABADA', 'ARSHDEEP SINGH', 'HARSHAL PATEL', 'YASH THAKUR', 'SHAMAR JOSHEP', 'RAVI BISHNOI', 'NAVEEN UL HAQ', 'AMIT MISHRA', 'MOSIN KHAN', 'ISHANT SHARMA', 'ANRICH NORTEJ', 'LUNGI NGIDI', 'KULDEEP YADAV', 'MUKESH KUMAR', 'SPENCER JOHNSON', 'JOSHUA LITTLE', 'NOOR AHMED', 'MOHIT SHARMA', 'UMESH YADAV', 'VARUN CHAKRAVARTHY', 'MITCHELL STARC', 'MUJEEB UR RAHMAN', 'DUSHMANTHA CHAMEERA', 'D CHAHAR', 'TUSHAR DESHPANDE', 'M PATHIRANA', 'S THAKUR', 'MAHEESH THEEKSHANA', 'MUKESH CHOUDHARY', 'JAYDEV UNADKAT', 'MAYANK MARKANDE', 'T NATARAJAN', 'BHUVNESHWAR KUMAR', 'PAT CUMMINS', 'F FAROOQI', 'PIYUSH CHAWLA', 'GERALD COETZEE', 'JASPRIT BUMRAH', 'JASON BEHRENDORFF', 'AAKASH MADHWAL'];

  const allRounders = ['RAVICHANDRAN ASHWIN', 'RIYAN PARAG', 'GLENN MAXWELL', 'C GREEN', 'TOM CURRAN', 'LIAM LIVINGSTONE', 'SAM CURRAN', 'SIKANDAR RAZA', 'CHRIS WOAKES', 'KRUNAL PANDYA', 'MARCUS STOINIS', 'DEEPAK HOODA', 'KYLE MAYERS', 'DAVID WILLEY', 'MITCHELL MARSH', 'AXAR PATEL', 'LALIT YADAV', 'VIJAY SHANKAR', 'RASHID KHAN', 'RAHUL TEWATIA', 'VENKATESH IYER', 'ANDRE RUSSELL', 'S NARINE', 'DARYL MITCHELL', 'MOEEN ALI', 'R RAVINDRA', 'SHIVAM DUBE', 'RAVINDRA JADEJA', 'WASHINGTON SUNDAR', 'SHAHABAZ AHMED', 'ABHISHEK SHARMA', 'MARCO JANSEN', 'HARDIK PANDYA', 'MOHAMMAD NABI', 'ARJUN TENDULKAR', 'SHREYAS GOPAL'];

  const handlePlayerSelection = (category, playerName) => {
    // Validation logic for number of players
    if ((category === 'batsmen' && formData.selectedBatsmen.length === 5) ||
        (category === 'bowlers' && formData.selectedBowlers.length === 4) ||
        (category === 'allRounders' && formData.selectedAllRounders.length === 2)) {
      setError(`You can only select ${category === 'batsmen' ? '5 batsmen' : category === 'bowlers' ? '4 bowlers' : '2 all-rounders'}`);
      return;
    }

    setError('');

    setFormData(prevState => ({
      ...prevState,
      [category]: [...prevState[category], playerName],
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation logic for number of players
      if (formData.selectedBatsmen.length !== 5 || formData.selectedBowlers.length !== 4 || formData.selectedAllRounders.length !== 2) {
        setError('Please select exactly 5 batsmen, 4 bowlers, and 2 all-rounders');
        return;
      }

      setError('');

      const response = await fetch('https://ipl2024.onrender.com/api/forms/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);

        // Clear form data after submission
        setFormData({
          name: '',
          teamName: '',
          mobileNumber: '',
          selectedBatsmen: [],
          selectedBowlers: [],
          selectedAllRounders: [],
        });
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };

  const openModal = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
    setPlayerList(category === 'batsmen' ? batsmen : category === 'bowlers' ? bowlers : allRounders);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = (playerName, checked) => {
    switch (currentCategory) {
      case 'batsmen':
        setFormData({
          ...formData,
          selectedBatsmen: checked
            ? [...formData.selectedBatsmen, playerName]
            : formData.selectedBatsmen.filter((player) => player !== playerName),
        });
        break;
      case 'bowlers':
        setFormData({
          ...formData,
          selectedBowlers: checked
            ? [...formData.selectedBowlers, playerName]
            : formData.selectedBowlers.filter((player) => player !== playerName),
        });
        break;
      case 'allRounders':
        setFormData({
          ...formData,
          selectedAllRounders: checked
            ? [...formData.selectedAllRounders, playerName]
            : formData.selectedAllRounders.filter((player) => player !== playerName),
        });
        break;
      default:
        break;
    }
  };


  return (
    <div className="container mt-5">
      <h1 className="text-center">Player Selection</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="teamName" className="form-label">Team Name:</label>
            <input
              type="text"
              className="form-control"
              id="teamName"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <button className="btn btn-primary w-100" type="button" onClick={() => openModal('batsmen')}>
              Select Batsmen
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" type="button" onClick={() => openModal('bowlers')}>
              Select Bowlers
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" type="button" onClick={() => openModal('allRounders')}>
              Select All-Rounders
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Selected Players</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Batsmen</td>
                  <td>{formData.selectedBatsmen.join(', ')}</td>
                </tr>
                <tr>
                  <td>Bowlers</td>
                  <td>{formData.selectedBowlers.join(', ')}</td>
                </tr>
                <tr>
                  <td>All-Rounders</td>
                  <td>{formData.selectedAllRounders.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Players</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row row-cols-3">
                  {playerList.map((player) => (
                    <div key={player} className="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`player-${player}`}
                          onChange={(e) => handleCheckboxChange(player, e.target.checked)}
                          checked={
                            currentCategory === 'batsmen'
                              ? formData.selectedBatsmen.includes(player)
                              : currentCategory === 'bowlers'
                              ? formData.selectedBowlers.includes(player)
                              : formData.selectedAllRounders.includes(player)
                          }
                        />
                        <label className="form-check-label" htmlFor={`player-${player}`}>
                          {player}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;