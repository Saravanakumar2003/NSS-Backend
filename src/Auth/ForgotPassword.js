import React, { useState } from 'react';
import { getFirebase } from 'react-redux-firebase';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState(''); // Email state
    const [errorMessage, setErrorMessage] = useState(null); // Error message state
    const [successMessage, setSuccessMessage] = useState(null); // Success message state

    const handleForgotPassword = (event) => { // Handle forgot password
        event.preventDefault(); // Prevent page reload

        // Email validation regex
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        // Validate email
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email address'); // Set error message
            setSuccessMessage(null); // Clear success message
            return; // Exit function
        }

        const firebase = getFirebase(); // Get firebase instance
        firebase.auth().sendPasswordResetEmail(email) // Send password reset email
            .then(() => { // On success
                setSuccessMessage('Password reset email sent!'); // Set success message
                setErrorMessage(null); // Clear error message
            })
            .catch((error) => { // On error
                setErrorMessage(error.message); // Set error message
                setSuccessMessage(null);
            });
    };
    return (
        <Container fluid className="login-container">
            <Row className="justify-content-center align-items-center vh-100">
                <Col md="4" sm="8" xs="10" className="login-form-container">
                    <div className="login-logo text-center mb-4">
                        <img src={require('../Assets/Nss.png')} alt="NSS Logo" />
                    </div>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    <Form onSubmit={handleForgotPassword}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </FormGroup>
                        <Button color="danger" className="login-button w-100" type="submit">Send password reset email</Button>
                        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                        {successMessage && <Alert color="success">{successMessage}</Alert>}
                        <p className="text-center mt-3">
                            Want to <Link to="/login">Login</Link>
                        </p>
                        <p className="text-center mt-3">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;