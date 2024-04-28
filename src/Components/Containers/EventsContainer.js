import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Row } from 'reactstrap'
import { compose } from 'redux'
import ResourceCard from '../Cards/PosterCard'
import VideoCard from '../Cards/VideoCard'
import AddResourcesForm from '../Forms/AddPosterForm'
import AddVideoForm from '../Forms/AddVideoForm'
import CustomModal from '../Modal'


const dummy = {
    title: 'No Title',
    description: 'No Description',
    date: 'No Date',
    time: 'No Time',
    place: 'No Place',
    videos: [],
    references: []
}


const EventContainer = ({ event, profile }) => {

    const currentEvent = event ? event[0] : dummy
    const isStudent = profile.userType === 'Student' ? true : false;


    const [isVideoFormOpen, setIsVideoFormOpen] = useState(false);
    const [isResourcesFormOpen, setIsResourcesFormOpen] = useState(false);

    const videoFormToggle = () => setIsVideoFormOpen(!isVideoFormOpen);
    const resourceFormToggle = () => setIsResourcesFormOpen(!isResourcesFormOpen);

    return (
        <Col>
            <Row>
                <Col md="4">
                    <h5 className="event-title">Event Title: <span className="c-title">{currentEvent.title || dummy.title}</span></h5>
                    <h5 className="event-title">Event Description: <span className="c-title">{currentEvent.description || dummy.description}</span></h5>
                    <h5 className="event-title">Event Date: <span className="c-title">{currentEvent.date || dummy.date}</span></h5>
                    <h5 className="event-title">Event Time: <span className="c-title">{currentEvent.time || dummy.time}</span></h5>
                    <h5 className="event-title">Event Place: <span className="c-title">{currentEvent.place || dummy.place}</span></h5>
                    {isStudent ? '' : <Button onClick={resourceFormToggle} className="button mt-2" color="primary">Add Poster</Button>}
                    {isStudent ? '' : <Button onClick={videoFormToggle} className="button navy mt-2">Add Video</Button>}

                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col>
                    <div className="mt-2 mb-3">
                        <h4 className="title">Event Poster</h4>
                    </div>

                    {(!currentEvent.references || currentEvent.references.length === 0) ?
                        <div className="w-100 mb-2 empty-div">
                            <p className="center-text">No Event Poster yet!</p>
                        </div>
                        : <ResourceCard resources={currentEvent.references} event={event}></ResourceCard>}
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col>
                    <div className="mt-2 mb-3">
                        <h4 className="title">Event Videos</h4>
                    </div>
                    {(!currentEvent.videos || currentEvent.videos.length === 0) ?
                        <div className="w-100 mb-2 empty-div">
                            <p className="center-text">No Videos yet!</p>
                        </div>
                        :
                        <VideoCard videos={currentEvent.videos} event={event}></VideoCard>
                    }
                </Col>
            </Row>
            <CustomModal modal={isResourcesFormOpen} title="Add New Image" toggle={resourceFormToggle}>
                <AddResourcesForm event={event}></AddResourcesForm>
            </CustomModal>
            <CustomModal modal={isVideoFormOpen} title="Add New Video" toggle={videoFormToggle}>
                <AddVideoForm event={event}></AddVideoForm>
            </CustomModal>
        </Col>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        event: state.firestore.ordered.event,
    }
}


export default compose(connect(mapStateToProps), firestoreConnect(
    (props) => [
        {
            collection: 'events',
            where: ['title', '==', `${props.title}`],
            storeAs: 'event'
        }
    ]
))(EventContainer);