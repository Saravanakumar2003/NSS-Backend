import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, Row, Container, Col } from 'reactstrap';
import { compose } from 'redux';
import Notification from '../../../Components/Notification';
import Slider from '../../../Components/Slider';

const Overview = ({profile, notifications}) => {
    return(
        <Container className="mt-4 mb-4">
        <Row>
            <Slider></Slider>
            <Col md='3'>
                <Notification notifications={notifications} profile={profile}></Notification>        
            </Col>
            <Col md='9'>
            <Card className="welcome-card mt-4">
                <h2>Welcome</h2>
                <h4 className="username">{profile.name}</h4>
                <p className="mt-2 ml-2 mb-2">
                In this portal you can view the details of the students, teachers, events, and resources. You can also add new events, resources, and view the notifications. 
                </p> 
            </Card>    

            </Col>
        </Row>
        
        </Container>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile, 
        notifications: state.firestore.ordered.adminnotifications
    }
}

export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'adminnotifications',
    }
]))(Overview);
