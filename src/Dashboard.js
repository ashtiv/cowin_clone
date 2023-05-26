import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { updateUserData } from './actions';
import instance from './axios';
import axios from 'axios';

function Dashboard() {
    const phoneNumber = useSelector((state) => state.phoneNumber);
    const uid = useSelector((state) => state.uid);
    const [showForm, setShowForm] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [persons, setPersons] = useState([]);
    const [dob, setDob] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [aadhaarError, setAadhaarError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (uid) {
            const fetchPersons = async () => {
                const data = await getAllPerson(uid);
                setPersons(data);
            };
            fetchPersons();
        }
    }, [uid]);

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
    function validateAadhaarNumber(adnum) {
        // Check if Aadhaar number is of 12 digits and only contains numerical digits
        const pattern = /^[0-9]{12}$/;
        return pattern.test(adnum);
    }

    const getregPhone = async () => {
        const response = await instance.get('/regPhones', {
            params: { uid } // Pass the uid parameter as a query parameter
        });
        return response.data;
        // const regPhone = response.data;
        // if (regPhone && regPhone.phoneNumber === phoneNumber) {
        //     console.log(regPhone, " reggggggggggggg111111111")
        //     return regPhone;
        // } else {
        //     alert('Invalid UID or phone number');
        //     return null;
        // }
    };
    const doRegPhone = () => {
        const newPerson = {
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth: dob,
            aadhaarNumber
        };
        // Make a POST request to the '/persons' endpoint with the new person object
        console.log(newPerson, " nnnnnnnnnnnn")
        instance.post(`/persons?uid=${uid}`, newPerson).then(() => {
            // Reset the form state variables
            setFirstName('');
            setLastName('');
            setDob('');
            setAadhaarNumber('');
            setAadhaarError('');
            setShowForm(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }).catch((error) => {
            console.log(error, 'erro22222222222')
        })
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !phoneNumber || !dob || !aadhaarNumber) {
            alert('All fields are required!');
            return;
        }
        if (!validateAadhaarNumber(aadhaarNumber)) {
            alert('Please enter a valid Aadhaar number');
            return;
        }
        doRegPhone()
    };

    const handleLogout = () => {
        auth.signOut();
    };
    const getAllPerson = async () => {
        try {
            console.log(uid, " uidddddddddddddd")
            const response = await instance.get('/persons', {
                params: { uid } // Pass the uid parameter as a query parameter
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
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

                        <div className="card-body mt-5">
                            {persons && (
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h6>Phone Number: {phoneNumber}</h6>
                                            <h6>Number of Persons with this phone number : {persons.length}</h6>
                                            {persons.map((person) => (
                                                <div key={person.id} className="card my-3">
                                                    <div className="card-body">
                                                        <h6 className="card-title">{person.firstName} {person.lastName}</h6>
                                                        <p className="card-text">Aadhaar Number: {person.aadhaarNumber}</p>
                                                        <p className="card-text">Date of Birth: {person.dateOfBirth}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                                        onChange={(event) => setAadhaarNumber(event.target.value)}
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