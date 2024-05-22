import React from 'react';
import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../Store/actions/authActions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CustomAlert from '../Components/Alert';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {
                email: '',
                name: '',
                password: '',
                branch: '',
                type: '',
                phone: '',
                semester: '',
                father: '',
                mother: '',
                dob: '',
                address: '',
                teampresent: '',
                nnsid: '',
                bg: '',
                image: '',
                gender: ''
            },
            errors: {}
        };
    }

    
    handleChange = (e) => {
        const input = this.state.input;
        const errors = this.state.errors;
        input[e.target.name] = e.target.value.trim();
        errors[e.target.name] = '';
        this.setState({ input, errors });
    };

    handleImageChange = (e) => {
        const input = this.state.input;
        input['image'] = e.target.files[0];
        this.setState({ input });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) {
            this.props.signUp(this.state.input);
        }
    };

    validate = () => {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email address";
        }

        if (typeof input["email"] !== "undefined") {
            var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your name.";
        }

        if (!input["phone"]) {
            isValid = false;
            errors["phone"] = "Please add your phone number";
        }

        if (!input["branch"]) {
            isValid = false;
            errors["branch"] = "Please select your branch";
        }

        if (!input["type"]) {
            isValid = false;
            errors["type"] = "Please select your type";
        }

        if (!input["semester"] && input["type"] === "Student") {
            isValid = false;
            errors["semester"] = "Please select your semester";
        }

        if (!input["father"] && input["type"] === "Student") {
            isValid = false;
            errors["father"] = "Please enter your father's name";
        }

        if (!input["mother"] && input["type"] === "Student") {
            isValid = false;
            errors["mother"] = "Please enter your mother's name";
        }

        if (!input["dob"] && input["type"] === "Student") {
            isValid = false;
            errors["dob"] = "Please enter your date of birth";
        }

        if (!input["address"] && input["type"] === "Student") {
            isValid = false;
            errors["address"] = "Please enter your address";
        }

        if (!input["teampresent"] && input["type"] === "Student") {
            isValid = false;
            errors["teampresent"] = "Please enter your team present";
        }

        if (!input["nnsid"] && input["type"] === "Student") {
            isValid = false;
            errors["nnsid"] = "Please enter your NSS ID";
        }

        if (!input["bg"] && input["type"] === "Student") {
            isValid = false;
            errors["bg"] = "Please enter your blood group";
        }

        if (!input["image"] && input["type"] === "Student") {
            isValid = false;
            errors["image"] = "Please upload your image";
        }

        this.setState({ errors });

        return isValid;
    };

    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return (<Redirect to="/" />);

        return (
            <div className="signup-container">
                <Container fluid>
                    <Row className="justify-content-center align-items-center vh-100">
                        <Col md="4" sm="8" xs="10" className="signup-form-container">
                            <div className="signup-logo text-center mb-4">
                                <img src={require('../Assets/Nss.png')} alt="NSS Logo" />
                            </div>
                            <h2 className="text-center mb-4">SIGNUP PAGE</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" placeholder="Your Name" onChange={this.handleChange} />
                                    {this.state.errors.name && <p className="error">{this.state.errors.name}</p>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                                    {this.state.errors.email && <p className="error">{this.state.errors.email}</p>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                                    {this.state.errors.password && <p className="error">{this.state.errors.password}</p>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <Input type="text" name="phone" id="phone" placeholder="Phone" onChange={this.handleChange} />
                                    {this.state.errors.phone && <p className="error">{this.state.errors.phone}</p>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="gender">Gender</Label>
                                    <Input type="select" name="gender" id="gender" onChange={this.handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Prefer not say</option>
                                    </Input>
                                    {this.state.errors.gender && <p className="error">{this.state.errors.gender}</p>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="branch">Select Your Branch</Label>
                                    <Input type="select" name="branch" id="branch" onChange={this.handleChange}>
                                        <option value="">Select Branch</option>
                                        {
                                            ["ECE", "CSE", "IT", "MECH", "EEE", "AI&DS", "CIVIL", "EIE", "CYBER", "AUTO", "Faculty"]
                                                .map(branch => (
                                                    <option key={branch} value={branch}>{branch}</option>
                                                ))
                                        }
                                    </Input>
                                    {this.state.errors.branch && <p className="error">{this.state.errors.branch}</p>}
                                </FormGroup>
                                <Row form>
                                    <Label for="type">Select Account Type</Label>
                                    <Col md="12">
                                        <FormGroup check>
                                            <Input type="radio" name="type" value="Student" id="student" onChange={this.handleChange} />
                                            <Label check for="student">
                                                Volunteer
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="12">
                                        <FormGroup check>
                                            <Input type="radio" name="type" value="Teacher" id="teacher" onChange={this.handleChange} />
                                            <Label check for="teacher">
                                                Teacher
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {this.state.input.type === "Teacher" ? '' : (
                                    <><FormGroup>
                                        <Label for="semester">Select Your Year</Label>
                                        <Input type="select" name="semester" id="semester" onChange={this.handleChange}>
                                            <option value="">Select Year</option>
                                            {["2021-2025", "2022-2026", "2023-2027", "Passed Out"]
                                                .map(semester => (
                                                    <option key={semester} value={semester}>{semester}</option>
                                                ))}
                                        </Input>
                                        {this.state.errors.semester && <p className="error">{this.state.errors.semester}</p>}
                                    </FormGroup>
                                        <FormGroup>
                                            <Label for="father">Father's Name</Label>
                                            <Input type="text" name="father" id="father" placeholder="Father's Name" onChange={this.handleChange} />
                                            {this.state.errors.father && <p className="error">{this.state.errors.father}</p>}
                                        </FormGroup><FormGroup>
                                            <Label for="mother">Mother's Name</Label>
                                            <Input type="text" name="mother" id="mother" placeholder="Mother's Name" onChange={this.handleChange} />
                                            {this.state.errors.mother && <p className="error">{this.state.errors.mother}</p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="dob">Date of Birth</Label>
                                            <Input type="date" name="dob" id="dob" onChange={this.handleChange} />
                                            {this.state.errors.dob && <p className="error">{this.state.errors.dob}</p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="address">Address</Label>
                                            <Input type="text" name="address" id="address" placeholder="Address" onChange={this.handleChange} />
                                            {this.state.errors.address && <p className="error">{this.state.errors.address}</p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="teampresent">Team Present</Label>
                                            <Input type="select" name="teampresent" id="teampresent" placeholder="Team Present" onChange={this.handleChange} />
                                            <option value="">Select Team</option>
<option value="Posters">Posters</option>
                                        <option value="Newsletter">Newsletter</option>
                                        <option value="Technical">Technical</option>
<option value="Nil">Nil</option>
                                    </Input>                                     {this.state.errors.teampresent && <p className="error">{this.state.errors.teampresent}</p>}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="nnsid">NSS ID (If Any)</Label>
                                            <Input type="text" name="nnsid" id="nnsid" placeholder="NSS ID" onChange={this.handleChange} />
                                            {this.state.errors.nnsid && <p className="error">{this.state.errors.nnsid}</p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="bg">Blood Group</Label>
                                            <Input type="select" name="bg" id="bg" placeholder="Blood Group" onChange={this.handleChange} />
                                            <option value="">Select Blood Group</option>
                                         
<option value="A+">A+</option>
<option value="A-">A-</option>
<option value="B+">B+</option>
<option value="B-">B-</option>
<option value="AB+">AB+</option>
<option value="AB-">AB-</option>
<option value="O+">O+</option>
<option value="O-">O-</option>
                                            {this.state.errors.bg && <p className="error">{this.state.errors.bg}</p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="image">Upload Your Image</Label>
                                            <Input type="file" name="image" id="image" onChange={this.handleImageChange} />
                                            {this.state.errors.image && <p className="error">{this.state.errors.image}</p>}
                                        </FormGroup>
                                    </>
                                )}
                                <Button color="danger" className="signup-button w-100" type="submit">Submit</Button>
                                <p className="text-center mt-3">
                                    Have an account already? <Link to="/login">Login</Link>
                                </p>
                                {authError && <CustomAlert color="danger" alert={authError} authError />}
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        branches: state.firestore.ordered.branches,
        semesters: state.firestore.ordered.semesters,
        authError: state.auth.authError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => {
            dispatch(signUp(newUser));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'branches' },
        { collection: 'semesters' }
    ])
)(Signup);