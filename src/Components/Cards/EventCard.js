import React, { useState } from 'react'
import {Card, CardBody, CardTitle, Button, Row, Col, CardSubtitle, Container} from 'reactstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CustomModal from '../Modal'
import { removeEvent } from '../../Store/actions/eventActions'



const EventCard = ({events, branch, sortedByBranch, removeEvent, admin}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleEventRemoval = (event) => {
        removeEvent(event)
    }


    const toggle = () => setIsOpen(!isOpen)

    const sortedEvents =  branch === "All Branches" ? events : sortedByBranch;

    return(
        <React.Fragment>
        <Row md="12">
            {sortedEvents && sortedEvents.map((c) =>
                    <Col md='6' key={c.id}>
                        <Card className="event-card">
                            <CardBody>
                                <CardTitle className="event-t"><strong>{c.title}</strong></CardTitle>
                                <CardSubtitle className="mb-2 subtitle"><b>Description:</b> {c.description}</CardSubtitle>
                                <CardSubtitle className="mb-2 subtitle"><b>Date:</b> {c.date}</CardSubtitle>
                                <CardSubtitle className="mb-2 subtitle"><b>Time: </b> {c.time}</CardSubtitle>
                                <CardSubtitle className="mb-2 subtitle"><b>Place: </b> {c.place}</CardSubtitle>
                                <Button  color="primary" className="mr-3">
                                    <a href={`/events/${c.title}`} className="link">
                                        View
                                    </a>
                                </Button>
                                
                                {admin ? <Button onClick={toggle} color="danger"> Remove </Button> : undefined}
                            </CardBody>
                        </Card> 
                        <CustomModal toggle={toggle} modal={isOpen} title="Remove Event">
                            <Container>
                                <h4>Are you sure?</h4>
                                <Button color="danger" className="card-button w-25" onClick={() => handleEventRemoval(c)}>Yes</Button>
                                <Button color="primary" className="card-button w-25 ml-2 mr-2" onClick={toggle}>No</Button>
                            </Container>
                        </CustomModal>
                    </Col>
            )}
        </Row>
        </React.Fragment>
    )
}



const mapStateToProps = (state) => {
    console.log(state)
    return{
        events: state.firestore.ordered.events,
        sortedByBranch: state.firestore.ordered.sortedByBranch
    }   
}

const mapDispatchToProps = (dispatch) => {
    return({
        removeEvent: (event) => {
            dispatch(removeEvent(event))
        }
    })
}


export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) => [
    {
        collection: 'events',
        storeAs: 'events'
    },   
    {
        collection: 'events',
        where: ['branch', '==', `${props.branch}`],
        storeAs: 'sortedByBranch'
    }
]))(EventCard);
