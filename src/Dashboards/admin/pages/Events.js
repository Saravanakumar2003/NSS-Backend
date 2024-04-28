import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Container, Row, Col, Button} from 'reactstrap'
import EventCard from '../../../Components/Cards/EventCard'
import CustomModal from '../../../Components/Modal'
import AddEventForm from '../../../Components/Forms/AddEventForm'

const Events = ({branches, profile}) => {
 const [branch,] = useState('All Branches')

 const adminOrTeacher = ["Admin", "Teacher"].includes(profile.userType);

 const [isOpen, setIsOpen] = useState(false);

 const toggle = () => setIsOpen(!isOpen);



 return(
    <Container className="mt-4 mb-4">
     <h1 className="table-title mt-3 mb-3">Events</h1>
            <Row className="mt-4 mb-4">

                <Row md='18' className="m-0">
                    <Col md="12">
                         {adminOrTeacher ? <Button color='primary' className="mt-auto w-auto" onClick={toggle}>Add New Event</Button> : undefined}
                    </Col>
                </Row>
            </Row>
            <EventCard branch={branch} admin={adminOrTeacher}></EventCard>
            <CustomModal title="Add New Event" modal={isOpen} toggle={toggle}>
                <AddEventForm></AddEventForm>
            </CustomModal>
    </Container>
 )
}

const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches,
        profile: state.firebase.profile
    }   
}

export default compose(connect(mapStateToProps),  firestoreConnect([
    {
        collection: 'branches'
    },  
])) (Events);