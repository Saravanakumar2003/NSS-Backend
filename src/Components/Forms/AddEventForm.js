import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { compose } from "redux";
import useForm from "../../Hooks/useForm";
import { addEvent } from "../../Store/actions/eventActions";

const AddEventForm = ({ addEvent, branches }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const validateInputs = () => {
        if (!inputs.title.trim()) {
            setErrorMessage('Title is required');
            return false;
        }
        if (!inputs.description.trim()) {
            setErrorMessage('Description is required');
            return false;
        }
        if (!inputs.place.trim()) {
            setErrorMessage('Place is required');
            return false;
        }
        if (!inputs.time.trim()) {
            setErrorMessage('Time is required');
            return false;
        }
        if (!inputs.date.trim()) {
            setErrorMessage('Date is required');
            return false;
        }
        if (!inputs.branch.length) {
            setErrorMessage('At least one branch must be selected');
            return false;
        }
        return true;
    };

    const handleEvent = async () => {
        if (!validateInputs()) {
            return;
        }
        try {
            await addEvent(inputs);
            setErrorMessage(null); // Clear the error message

            setSuccessMessage('Upload successful'); // Set the success message
        } catch (error) {
            setErrorMessage(error.message); // Set the error message if an error occurs
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(
        {
            title: "",
            description: "",
            place: "",
            time: "",
            date: "",
            branch: [],
        },
        handleEvent
    );

    const handleMultipleInputChange = (e) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        inputs.branch = value;
    };



    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            type="textarea"
                            id="description"
                            onChange={handleInputChange}
                        ></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="place">Place of Event</Label>
                        <Input type="text" id="place" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="time">Start Time</Label>
                        <Input type="time" id="time" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="date">Date</Label>
                        <Input type="date" id="date" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Input type="select" name="branch" id="branch" onChange={handleMultipleInputChange} multiple>
                            {
                                ["ECE", "CSE", "IT", "MECH", "EEE", "AI&DS", "CIVIL", "EIE", "CYBER", "AUTO"]
                                    .map(branch => (
                                        <option key={branch} value={branch}>{branch}</option>
                                    ))
                            }
                        </Input>
                    </Row>
                </Col>
                <Button color="primary" type="submit" className="mt-4">
                    Add Event
                </Button>
            </Container>
            {successMessage &&
                <div className="success-message">
                    <i className="fas fa-check-circle"></i> {successMessage}
                </div>
            }
            {errorMessage &&
                <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i> {errorMessage}
                </div>
            }
        </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        branches: state.firestore.ordered.branches,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addEvent: (event) => {
            dispatch(addEvent(event));
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: "branches",
        },
    ])
)(AddEventForm);
