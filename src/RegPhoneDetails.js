import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import instance from "./axios";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RegPhoneDetails(props) {
    const location = useLocation();
    const [regPhone, setRegPhone] = useState(null);


    useEffect(() => {
        if (location?.state?.uid) {
            const uid = location.state.uid;
            instance
                .get("/regPhones", {
                    params: { uid: uid },
                })
                .then((response) => {
                    console.log(response.data)
                    setRegPhone(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }, []);

    if (!regPhone) {
        return <p>Loading...</p>;
    }

    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const month = today.getMonth() - birth.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <div>
            <Container className="my-4">
                <Row>
                    <Col>
                        <Card>
                            <Card.Header className="bg-cowin-blue text-white d-flex justify-content-between align-items-center">
                                <img src="cowin-logo.png" alt="Cowin Logo" height="30" />
                                <h5 className="mb-0">RegPhone Details</h5>
                                <a href="/" className="btn btn-cowin-green btn-lg">
                                    Back
                                </a>
                            </Card.Header>
                            <Card.Body>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>UID</th>
                                            <td>{regPhone.uid}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number</th>
                                            <td>{regPhone.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Persons</th>
                                            <td>
                                                {regPhone.persons.map((person) => (
                                                    <Card key={person.id} className="mb-3">
                                                        <Card.Header>{person.name}</Card.Header>
                                                        <Card.Body>
                                                            <Card.Text>
                                                                <strong>Aadhaar Number:</strong> {person.aadhaarNumber}<br />
                                                                <strong>Date of Birth:</strong> {person.dateOfBirth} (Age: {calculateAge(person.dateOfBirth)})<br />
                                                                <strong>Vaccination Date Dose 1:</strong> {person.vaccinationDateDose1 || "Not vaccinated yet"}<br />
                                                                <strong>Vaccination Date Dose 2:</strong> {person.vaccinationDateDose2 || "Not vaccinated yet"}<br />
                                                            </Card.Text>

                                                        </Card.Body>
                                                    </Card>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RegPhoneDetails;