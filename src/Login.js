import React, { useState } from 'react';

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [phoneNumberSubmitted, setPhoneNumberSubmitted] = useState(false);

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handlePhoneNumberSubmit = (event) => {
        event.preventDefault();
        // handle phone number submission
        setPhoneNumberSubmitted(true);
    };

    const handleOtpSubmit = (event) => {
        event.preventDefault();
        // handle phone number verification with OTP
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={phoneNumberSubmitted ? handleOtpSubmit : handlePhoneNumberSubmit}>
                        <h2 className="text-center my-4">Phone Number Verification</h2>
                        <div className="form-group my-20">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>
                        {!phoneNumberSubmitted ? (
                            <button type="submit" className="btn btn-primary btn-block my-2">
                                Send OTP
                            </button>
                        ) : (
                            <>
                                <div className="form-group my-2">
                                    <label htmlFor="otp">OTP (valid for 5 mins only):</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        placeholder="Enter the OTP you received"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block my-2">
                                    Verify
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;