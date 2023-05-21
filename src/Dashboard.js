import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
    const phoneNumber = useSelector(state => state.phoneNumber);
    const uid = useSelector(state => state.uid);
    console.log(uid, phoneNumber)

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Dashboard</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <h6>Uid:</h6>
                                <p>{uid}</p>
                                <h6>Phone Number:</h6>
                                <p>{phoneNumber}</p>
                            </div>
                            {/* Add more content here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;