import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button, Col, Row } from 'reactstrap'
import { compose } from 'redux'
import NewsletterCard from '../Cards/NewsletterCard'
import CustomModal from '../Modal'
import AddNewsletterForm from '../Forms/AddNewsletterForm'

const dummy = {
    title: 'No Title',
    desc: 'No Description',
    file: 'No File'
}

const NewsletterContainer = ({ newsletter, profile }) => {

    const currentNewsletter = newsletter ? newsletter[0] : dummy
    const adminOrTeacher = ["Admin", "Teacher"].includes(profile.userType);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Col>
            <Row>
                <Col md="4">
                    {adminOrTeacher ? <Button onClick={toggle} className="button mt-2" color="primary">Add Newsletter</Button> : ''}
                </Col>
            </Row>
            <Row className="mt-3 mb-3">

                {(!currentNewsletter || currentNewsletter.length === 0) ?
                    <div className="w-100 mb-2 empty-div">
                        <p className="center-text">No Newsletters yet!</p>
                    </div>
                    : <NewsletterCard newsletters={currentNewsletter} admin={adminOrTeacher} pdfUrl={currentNewsletter.file}></NewsletterCard> }
            </Row>

            <CustomModal title="Add New Newsletter" modal={isOpen} toggle={toggle}>
                <AddNewsletterForm newsletter={newsletter}></AddNewsletterForm>
            </CustomModal>
        </Col>
    )
}

const mapStateToProps = (state) => {
    return {
        newsletter: state.firestore.ordered.newsletters,
        profile: state.firebase.profile
    }
}

export default compose(connect(mapStateToProps), firestoreConnect(
    (props) => [
        { 
            collection: 'newsletters',
            where: [
                ['userType', '==', 'Admin'],
                ['userType', '==', 'Teacher']
            ],
            storeAs: 'newsletter' 
        }
    ]
))(NewsletterContainer);
