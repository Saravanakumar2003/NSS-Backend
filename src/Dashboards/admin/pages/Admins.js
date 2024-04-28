import React, {useState} from 'react'
import { Container, Button,Row, Col} from 'reactstrap'
import CustomModal from '../../../Components/Modal'
import AdminTable from '../../../Components/Table/AdminTable'

const Admins = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);

    return(
        <Container className="mt-4 mb-4">
        <h1 className="table-title">Admins</h1>
        <AdminTable></AdminTable>
    </Container>   
    )
}


export default Admins