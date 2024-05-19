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
    constructor(props) {
        super(props);

        this.state = {
            input: {
                email: '',
                password: ''
            },
            errors: {}
        };
    }

    handleChange = (e) => {
        const input = this.state.input;
        const errors = this.state.errors;
        input[e.target.id] = e.target.value;
        errors[e.target.id] = '';
        this.setState({ input, errors });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.props.signIn(this.state.input);
        }
    };

    validate() {
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

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return (<Redirect to="/"></Redirect>);

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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
