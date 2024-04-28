import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import useForm from '../../Hooks/useForm'
import { addQuestion } from '../../Store/actions/forumActions'
 
const AddQuestionForm = ({addQuestion, events, user}) => {
    const userName = user.name
    const handleClass = () => {
        addQuestion(inputs)
    }


    const { inputs, handleInputChange, handleSubmit} = useForm({topic: '', question: '', user: userName}, handleClass)

    return(
        <Form onSubmit={handleSubmit}>
            <Container>
                <Col>
                    <Row className="mt-2">
                        <Label htmlFor="question">Question</Label>
                        <Input type="textarea"  id="question" placeholder="Add your question here" onChange={handleInputChange}></Input>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="topic">Event</Label>
                        <Input type="select" className="selector" name="select" id="topic" onChange={handleInputChange}>
                            <option>Select Event</option>
                            {events && events.map(event => (
                                <option key={event.id} value={event.title}>{event.title}</option>
                            ))}           
                        </Input>
                    </Row>
                </Col>
                <Button color="primary" type="submit" className="mt-4">
                    Add Question 
                </Button>
            </Container>
        </Form>
    )
}


const mapStateToProps = (state) => {
    return{
        events: state.firestore.ordered.events,
        user: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        addQuestion: (newClass) => {
            dispatch(addQuestion(newClass))
        }
    })
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {
            collection: 'events'
        },
    ])
)(AddQuestionForm);