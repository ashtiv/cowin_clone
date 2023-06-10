import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import instance from './axios';
import './Dashboard.css';

function SuperDashboard() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuperPerson, setIsSuperPerson] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.multiFactor) {
                // User is logged in, check if they are a super person
                instance
                    .get('/checksuperuser', {
                        params: {
                            phoneNumber: user.phoneNumber,
                        },
                    })
                    .then((response) => {
                        console.log(response.data.superPerson, ' ssssssssssuper');
                        if (response.data.superPerson) {
                            console.log(' ssssssssss1111111111111111');
                            setIsSuperPerson(true);
                            setLoggedIn(true);
                        } else {
                            setIsSuperPerson(false);
                            setLoggedIn(false);
                            navigate('/');
                        }
                    })
                    .catch((error) => {
                        console.log(' sssssssssssssssss22222222222');
                        console.error(error);
                        setIsSuperPerson(false);
                        setLoggedIn(false);
                        navigate('/');
                    });
            } else {
                // User is not logged in
                setIsSuperPerson(false);
                setLoggedIn(false);
                navigate('/');
            }
        });

        return unsubscribe;
    }, [navigate]);

    const handleLogout = () => {
        auth.signOut();
    };

    // Render the super dashboard if the user is logged in and is a super person
    return (
        <div className="container-fluid my-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div class="card-header bg-cowin-blue text-white d-flex justify-content-between align-items-center">
                            <img src="cowin-logo.png" alt="Cowin Logo" height="30" />
                            <h5 class="mb-0">Admin Section</h5>
                            <button class="btn btn-cowin-green btn-lg" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                        <div className="card-body">
                            <form className="form-inline my-2 my-lg-0">
                                <input
                                    className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Search with phone number"
                                    aria-label="Search"
                                />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                                    Search
                                </button>
                            </form>
                            <p>Here's some content for the dashboard!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuperDashboard;
