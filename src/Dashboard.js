import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { updateUserData } from './actions';
import instance from './axios';
import axios from 'axios';

import './Dashboard.css'

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
        <div class="container-fluid my-4">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header bg-cowin-blue text-white d-flex justify-content-between align-items-center">
                            <img src="cowin-logo.png" alt="Cowin Logo" height="30" />
                            <h5 class="mb-0">Dashboard</h5>
                            <button class="btn btn-cowin-green btn-lg" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>

                        <div class="card-body mt-5">
                            {persons && (
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h6>Phone Number: {phoneNumber}</h6>
                                            <h6>Number of Persons with this phone number : {persons.length}</h6>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        {persons.map((person) => (
                                            <div class="col-md-6" key={person.id}>
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{person.firstName} {person.lastName}</h5>
                                                        <p class="card-text">
                                                            <strong>Date of Birth:</strong> {person.dateOfBirth}
                                                        </p>
                                                        <p class="card-text">
                                                            <strong>Aadhaar Number:</strong> {person.aadhaarNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {!showForm && (
                                <button class="btn btn-cowin-green btn-lg btn-block" onClick={handleAddMember} style={{ marginBottom: '20px' }}>
                                    Add a member
                                </button>
                            )}

                            {showForm && (
                                <form onSubmit={handleFormSubmit}>
                                    <div class="form-group">
                                        <label for="firstName">First Name</label>
                                        <input type="text" class="form-control" id="firstName" placeholder="Enter first name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                                    </div>
                                    <div class="form-group">
                                        <label for="lastName">Last Name</label>
                                        <input type="text" class="form-control" id="lastName" placeholder="Enter last name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                                    </div>
                                    <div class="form-group">
                                        <label for="dob">Date of Birth</label>
                                        <input type="date" class="form-control" id="dob" placeholder="Enter date of birth" value={dob} onChange={(event) => setDob(event.target.value)} />
                                    </div>
                                    <div class="form-group">
                                        <label for="aadhaarNumber">Aadhaar Number</label>
                                        <input type="text" class="form-control" id="aadhaarNumber" placeholder="Enter Aadhaar number" value={aadhaarNumber} onChange={(event) => setAadhaarNumber(event.target.value)} />
                                        {aadhaarError && <div class="text-danger">{aadhaarError}</div>}
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-cowin-green mr-2">
                                            Submit
                                        </button>
                                        <button type="button" class="btn btn-secondary" onClick={handleCancel}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;