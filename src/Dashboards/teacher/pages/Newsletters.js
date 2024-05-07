import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Container, Row, Col, Button} from 'reactstrap'
import NewsletterCard from '../../../Components/Cards/NewsletterCard'
import CustomModal from '../../../Components/Modal'
import AddNewsletterForm from '../../../Components/Forms/AddNewsletterForm'


const Newsletters = ({profile}) => {
    const adminOrTeacher = ["Admin", "Teacher"].includes(profile.userType);
    
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => setIsOpen(!isOpen);
    
    return(
        <Container className="mt-4 mb-4">
        <h1 className="table-title mt-3 mb-3">Newsletters</h1>
                <Row className="mt-4 mb-4">
    
                    <Row md='18' className="m-0">
                        <Col md="12">
                            {adminOrTeacher ? <Button color='primary' className="mt-auto w-auto" onClick={toggle}>Add New Newsletter</Button> : undefined}
                        </Col>
                    </Row>
                </Row>
                <NewsletterCard admin={adminOrTeacher}></NewsletterCard>
                <CustomModal title="Add New Newsletter" modal={isOpen} toggle={toggle}>
                    <AddNewsletterForm></AddNewsletterForm>
                </CustomModal>
        </Container>
    )
    }

const mapStateToProps = (state) => {
    return{
        profile: state.firebase.profile
    }   
}

export default compose(connect(mapStateToProps),  firestoreConnect([
    {
        collection: 'newsletters'
    },
])) (Newsletters);

