import React, { useState } from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { Container, Input,Row, Col} from 'reactstrap'
import { compose } from 'redux'
import {connect} from 'react-redux';
import StudentTable from '../../../Components/Table/StudentTable'



const Students = ({branches}) => {
    const [selectedBranch, setSelectedBranch] = useState('All');

    const handleBranch = (e) => {
        setSelectedBranch(e.target.value)
    }


    return(
        <Container className="mt-4 mb-4">
            <h1 className="table-title">Volunteers</h1>
            <StudentTable branch={selectedBranch}></StudentTable>
        </Container>        
    )
}



const mapStateToProps = (state) => {
    return{
        branches: state.firestore.ordered.branches,
    }   
}


export default compose(connect(mapStateToProps), firestoreConnect([
    {
        collection: 'branches'
    },   
]))(Students);


