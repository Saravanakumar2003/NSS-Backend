import React, { useState } from 'react'
import { Card, CardBody, CardTitle, Button, Row, Col, CardSubtitle, Container } from 'reactstrap'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CustomModal from '../Modal'
import { deleteNewsletter } from '../../Store/actions/newsletterActions'



const NewsletterCard = ({ newsletters, admin, deleteNewsletter }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleNewsletterRemoval = (newsletter) => {
        deleteNewsletter(newsletter)
    }

    const toggle = () => setIsOpen(!isOpen)

    return (
        <React.Fragment>
            <Row md="12">
                {newsletters && newsletters.map((c) =>
                    <Col md='6' key={c.id}>
                        <Card className="event-card">
                            <CardBody>
                                <CardTitle className="event-t"><strong>{c.title}</strong></CardTitle>
                                <CardSubtitle className="mb-2 subtitle"><b>Description:</b> {c.desc}</CardSubtitle>
                                <Button color="primary" className="mr-3">
                                    <a href={c.file} className="link" target="_blank" rel="noopener noreferrer">
                                        View
                                    </a>
                                </Button>

                                {admin ? <Button onClick={toggle} color="danger"> Remove </Button> : undefined}
                            </CardBody>
                        </Card>
                        <CustomModal toggle={toggle} modal={isOpen} title="Remove Newsletter">
                            <Container>
                                <h4>Are you sure?</h4>
                                <Button color="danger" className="card-button w-25" onClick={() => handleNewsletterRemoval(c)}>Yes</Button>
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
    return {
        newsletters: state.firestore.ordered.newsletters,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNewsletter: (newsletter) => {
            dispatch(deleteNewsletter(newsletter))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect((props) =>
    [
        {
            collection: 'newsletters',
            storeAs: 'newsletters'
        }
    ]))(NewsletterCard);