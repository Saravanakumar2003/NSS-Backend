import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, Col, Row, Button } from 'reactstrap'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { updateTeacherDisplayPic } from '../../Store/actions/teacherActions'
import CustomModal from '../Modal/';
import EditTeacherForm from '../Forms/EditTeachersForm'

const dummy = {
    'img': 'https://i.ibb.co/wd8cRVZ/img-person-placeholder.jpg',
    'name': 'John Doe',
    'SRN': 'dsu1200'
}

const TeacherInfo = ({ teacher, updateTeacherDisplayPic }) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentTeacher = teacher ? teacher[0] : dummy

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Col>
                <Row md="12">
                    <Col md="4">

                        <Button color="primary" className="button mt-2 mb-2" onClick={() => setIsOpen(true)}>Edit Info</Button>
                    </Col>

                    <Col md="12">
                        <Card className="basic-info mt-3">
                            <h4>Basic Info</h4>
                            <Row md="6">
                                <Col md='4'>
                                    <p className="info-label">Teacher Name: <span className="s-name">{currentTeacher.name}</span></p>
                                </Col>
                                <Col md="4">
                                    <p className="info-label">SRN: <span className="s-name">{currentTeacher.SRN}</span></p>
                                </Col>
                            </Row>
                            <Row md="6">
                                <Col md='4'>
                                    <p className="info-label">Gender: <span className="s-name">{currentTeacher.gender}</span></p>
                                </Col>
                                <Col md='4'>
                                    <p className="info-label">Branch: <span className="s-name">{currentTeacher.Branch}</span></p>
                                </Col>
                            </Row>
                            <Row md="6">
                                <Col md="4">
                                    <p className="info-label">Phone: <span className="s-name"> +91 {currentTeacher.phone}</span></p>
                                </Col>
                                <Col md="4">
                                    <p className="info-label">Email: <span className="s-name">{currentTeacher.email}</span></p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <CustomModal title="Edit Teacher" modal={isOpen} toggle={toggle}>
                    <EditTeacherForm teacher={currentTeacher}></EditTeacherForm>
                </CustomModal>
            </Col>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        teacher: state.firestore.ordered.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        updateTeacherDisplayPic: (student, url) => {
            dispatch(updateTeacherDisplayPic(student, url))
        }
    })
}



export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(
    (props) => [
        {
            collection: 'users',
            where: ['name', '==', `${props.name}`]
        }
    ]
))(TeacherInfo);