import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { updateUserData } from './actions';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function PhoneAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');

    // Sent OTP
    const signin = (event) => {
        event.preventDefault()
        if (mynumber === "" || mynumber.length < 10) return;

        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber("+91" + mynumber, verify).then((result) => {
            setfinal(result);
            alert("code sent")
            setshow(true);
        })
            .catch((err) => {
                alert(err);
                window.location.reload()
            });
    }

    // Validate OTP
    const ValidateOtp = (event) => {
        event.preventDefault();
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {
            const uid = result.user.multiFactor.user.uid
            console.log(uid)
            dispatch(updateUserData(uid, "+91" + mynumber));
            navigate('/dashboard');
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Container fluid className="bg-white py-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h3 className="text-center mb-4">Login with Phone Number</h3>
                            {!show && <Form onSubmit={signin}>
                                <Form.Label>Enter your phone number:</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text">+91</span>
                                    <Form.Control type="tel" placeholder="Enter phone number" value={mynumber} onChange={(e) => setnumber(e.target.value)} />
                                </div>
                                <div id="recaptcha-container"></div>
                                <Button type='submit' variant="primary" className="w-100 mt-3">Send OTP</Button>
                            </Form>}


                            {show && (
                                <Form className="mt-4" onSubmit={ValidateOtp}>
                                    <Form.Label>Enter the OTP sent to your phone:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setotp(e.target.value)} />
                                    <Button type='submit' variant="success" className="w-100mt-3">Verify OTP</Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PhoneAuth;