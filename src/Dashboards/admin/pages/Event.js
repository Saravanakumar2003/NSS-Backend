import React from 'react'
import { useParams } from 'react-router'
import { Container } from 'reactstrap'
import EventContainer from '../../../Components/Containers/EventsContainer';


const Event = () => {
    const {event} = useParams();

    return(
        <Container>
            <h2 className="table-title mt-3 mb-3 p-3">Events</h2>
            <EventContainer title={event}></EventContainer>
        </Container>
    )
}


export default Event;