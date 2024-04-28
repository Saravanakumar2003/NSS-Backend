import React, { useState } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addResource } from '../../Store/actions/eventActions'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

const AddResourceForm = ({event, addResource}) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(undefined);
    const [uploadStatus, setUploadStatus] = useState(''); 
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleFileUpload = (file, event, name) => {
        console.log("Uploading file:", file); 
        const currentEvent = event;
        const newFile = file;
        const title = name;
        var metadata = { // Set metadata for the images
            contentType: 'image',
            
        }
        const uploadTask = storage.ref(`/eventResources/${title}`).put(newFile, metadata);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("eventResources")
            .child(title)
            .getDownloadURL()
            .then((url) => {
                addResource(currentEvent, title, url)
                setUploadStatus('success'); // Update upload status on success
            })
            .catch((error) => {
                console.error("Upload failed:", error);
                setUploadStatus('error'); // Update upload status on failure
            });
        });
    }

    return(
        <Container>
            <Row md="12">
                <Col>
                    <Label htmlFor="name">Title</Label>
                    <Input type="" id="name" value={name} onChange={(e) => setName(e.target.value)}></Input>
                </Col>
            </Row>
            <Row md="12" className="mt-3">
                <Col md="4">
                    <Label htmlFor="name">Resource File</Label>
                    <Input type="file" onChange={handleFile} id="imageUpload"></Input>
                    <UncontrolledTooltip placement='right' target="imageUpload">
                        Image Files only
                    </UncontrolledTooltip>
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(file, event, name)}}>Add Resource</Button>
            {uploadStatus === 'success' && <Alert color="success">Upload successful!</Alert>} {/* Show success message */}
            {uploadStatus === 'error' && <Alert color="danger">Upload failed. Please try again.</Alert>} {/* Show error message */}
       
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addResource: (event, title, url) => {
            dispatch(addResource(event, title, url))
        }
    })
}

export default connect(null, mapDispatchToProps)(AddResourceForm);