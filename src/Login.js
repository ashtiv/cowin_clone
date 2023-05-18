import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from './firebase';

function PhoneAuth() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [recaptchaShown, setrecaptchaShown] = useState(true);

    function handlePhoneChange(event) {
        setPhoneNumber(event.target.value);
    }

    function handleCodeChange(event) {
        setVerificationCode(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        const formattedPhoneNumber = `+91${phoneNumber}`;
        auth.signInWithPhoneNumber(formattedPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                setrecaptchaShown(false);
                setVerificationId(confirmationResult.verificationId);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleSignIn(event) {
        event.preventDefault();

        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        );

        auth.signInWithCredential(credential)
            .then((userCredential) => {
                const uid = userCredential.user.multiFactor.user.uid;
                console.log(uid);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Phone Number Verification</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">+91</span>
                                        <input type="tel" className="form-control" id="phone" value={phoneNumber} onChange={handlePhoneChange} placeholder="Enter your 10-digit phone number" required />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mb-3">
                                    <button type="submit" className="btn btn-primary">Send Verification Code</button>
                                </div>
                            </form>
                            {verificationId && (
                                <form onSubmit={handleSignIn}>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Verification Code</label>
                                        <input type="number" className="form-control" id="code" value={verificationCode} onChange={handleCodeChange} placeholder="Enter the verification code sent to your phone" required />
                                    </div>
                                    <div className="d-grid gap-2 mb-3">
                                        <button type="submit" className="btn btn-primary">Verify</button>
                                    </div>
                                </form>
                            )}
                            {recaptchaShown && (
                                <div id="recaptcha-container" className="mb-3"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhoneAuth;