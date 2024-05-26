import React from 'react';
import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../App.css';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../Store/actions/authActions';
import Footer from '../Components/Footer/Footer';
import CustomAlert from '../Components/Alert';

class Login extends React.Component { 
    constructor(props) { // Constructor with props parameter (props are properties passed to this component from its parent component or from a route in this case from react-router-dom Route component) 
        super(props); // Super props

        this.state = { // State object
            input: { 
                email: '', 
                password: ''
            }, // Input object with email and password properties
            errors: {}
        };
    }

    handleChange = (e) => { // Handle change function with event parameter
        const input = this.state.input; // Input object
        const errors = this.state.errors; // Errors object
        input[e.target.id] = e.target.value; // Set input object property with target id as key and target value as value
        errors[e.target.id] = ''; // Set errors object property with target id as key and empty string as value (clear error message)
        this.setState({ input, errors }); // Set state with input and errors objects
    };

    handleSubmit = (e) => { // Handle submit function with event parameter
        e.preventDefault(); // Prevent page reload
        if (this.validate()) { // If validate function returns true
            this.props.signIn(this.state.input); // Call signIn function with input object as parameter
        }
    };

    validate() { // Validate function
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email";
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter the password";
        }

        this.setState({  // Set state with input and errors objects
            errors: errors 
        }); 

        return isValid; 
    }

    render() {
        const { auth, authError } = this.props; // Destructure auth and authError from props
        if (auth.uid) return (<Redirect to="/"></Redirect>); // If auth uid exists, redirect to home page 

        return (
            <Container fluid className="login-container">
                <Row className="justify-content-center align-items-center vh-100">
                    <Col md="4" sm="8" xs="10" className="login-form-container">
                        <div className="login-logo text-center mb-4">
                            <img src={require('../Assets/Nss.png')} alt="NSS Logo" />
                        </div>
                        <h2 className="text-center mb-4">LOGIN PAGE</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="email">Username</Label>
                                <Input type="email" name="email" id="email" placeholder="Username" onChange={this.handleChange} />
                                {this.state.errors.email && <p className="error">{this.state.errors.email}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                                {this.state.errors.password && <p className="error">{this.state.errors.password}</p>}
                            </FormGroup>
                            <Button color="danger" className="login-button w-100" type="submit">Login</Button>
                           
                            <p className="text-center mt-3">
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </p>
                    
                            <p className="text-center mt-3">
                                <Link to="/forgot-password">Forgot your password?</Link>
                            </p>
                            {authError && <CustomAlert color="danger" alert={authError} authError></CustomAlert>}
                        </Form>
                    </Col>
                </Row>
                <Footer />
            </Container>
        );
    }
}

const mapStateToProps = (state) => { // Map state to props
    return { // Return object
        auth: state.firebase.auth, // Auth property from state.firebase.auth
        authError: state.auth.authError, // Auth error property from state.auth.authError
    };
};

const mapDispatchToProps = (dispatch) => { // Map dispatch to props 
    return { // Return object
        signIn: (creds) => dispatch(signIn(creds)), // SignIn function with creds parameter dispatches signIn action with creds parameter 
    }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(Login); // Connect mapStateToProps and mapDispatchToProps to Login component and export it as default export  
