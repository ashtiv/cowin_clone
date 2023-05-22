import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { updateUserData } from './actions';

function Dashboard() {
    const phoneNumber = useSelector((state) => state.phoneNumber);
    const uid = useSelector((state) => state.uid);
    const [showForm, setShowForm] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [aadhaarError, setAadhaarError] = useState('');
    const dispatch = useDispatch();

    const handleAddMember = () => {
        setShowForm(true);
    };
    const handleCancel = () => {
        setFirstName('');
        setLastName('');
        setDob('');
        setAadhaarNumber('');
        setShowForm(false);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // TODO: Handle form submit
        setFirstName('');
        setLastName('');
        setDob('');
        setAadhaarNumber('');
        setShowForm(false);
    };

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-headerbg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Dashboard</h5>
                            <button className="btn btn-light" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <h6>Uid:</h6>
                                <p>{uid}</p>
                                <h6>Phone Number:</h6>
                                <p>{phoneNumber}</p>
                            </div>
                            <div className="mb-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAddMember}
                                    style={{ marginBottom: '20px' }}
                                >
                                    Add a member
                                </button>
                                {showForm && (
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        value={firstName}
                                                        onChange={(event) => setFirstName(event.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        value={lastName}
                                                        onChange={(event) => setLastName(event.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="dob">Date of Birth:</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="dob"
                                                        value={dob}
                                                        onChange={(event) => setDob(event.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="aadhaarNumber">Aadhaar Number:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="aadhaarNumber"
                                                        value={aadhaarNumber}
                                                        onChange={(event) => {
                                                            const input = event.target.value;
                                                            if (/^\d{0,12}$/.test(input)) {
                                                                setAadhaarNumber(input);
                                                                setAadhaarError('');
                                                            } else {
                                                                setAadhaarNumber(input);
                                                                setAadhaarError('Please enter a valid Aadhaar number');
                                                            }
                                                        }}
                                                        // maxLength={12}
                                                        required
                                                    />
                                                    {aadhaarError && (
                                                        <div className="text-danger">{aadhaarError}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                        <button
                                            className="btn btn-light"
                                            onClick={handleCancel}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;