import React, { useState, useRef, useEffect } from 'react'
import { Container,Row, Col, Input, Label, Button, UncontrolledTooltip, Alert, Progress } from 'reactstrap'
import {storage} from "../../config/fbConfig"
import { addNewVideo } from '../../Store/actions/eventActions'
import { connect } from 'react-redux'

const AddVideoForm = ({event, addNewVideo}) => {
    const [name, setName] = useState('');
    const [video, setVideo] = useState(undefined);
    const [uploadStatus, setUploadStatus] = useState(''); // New state variable for upload status
    const [uploadProgress, setUploadProgress] = useState(0); // New state variable for upload progress
    const isMounted = useRef(false); // New ref for tracking whether the component is mounted

    useEffect(() => {
        isMounted.current = true; // Set isMounted to true when the component mounts
        return () => {
            isMounted.current = false; // Set isMounted to false when the component unmounts
        };
    }, []);

    const handleFile = (e) => {
        setVideo(e.target.files[0])
    }

    const handleFileUpload = (file, event, name) => {
    const currentevent = event;
    const newVideo = file;
    const title = name;
    var metadata = {
        contentType: 'video/mp4',
    }
    const uploadTask = storage.ref(`/eventVideos/${title}`).put(newVideo, metadata);
    uploadTask.on("state_changed", 
        (snapshot) => {
            // Calculate the upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (isMounted.current) {
                setUploadProgress(progress); // Update the upload progress
            }
        }, 
        console.error, 
        () => {
            storage
                .ref("eventVideos")
                .child(title)
                .getDownloadURL()
                .then((url) => {
                    addNewVideo(currentevent, title, url)
                    setUploadStatus('success'); // Update upload status on success
                })
                .catch((error) => {
                    console.error("Upload failed:", error);
                    setUploadStatus('error'); // Update upload status on failure
                });
        }
    );
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
                <Col md="5">
                    <Label htmlFor="name">Video File</Label>
                    <Input type="file" onChange={handleFile} id="pdfUpload"></Input>
                    <UncontrolledTooltip placement='right' target="pdfUpload">
                        Video Files
                    </UncontrolledTooltip>
                </Col>
            </Row>
            <Button color="primary" className="mt-3 mb-3" onClick={() => {handleFileUpload(video, event, name)}}>Add Video</Button>
            {uploadProgress > 0 && <Progress value={uploadProgress} max="100">{uploadProgress}%</Progress>} {/* Show upload progress */}
            {uploadStatus === 'success' && <Alert color="success">Upload successful!</Alert>} {/* Show success message */}
            {uploadStatus === 'error' && <Alert color="danger">Upload failed. Please try again.</Alert>} {/* Show error message */}
        </Container>
    )
}


const mapDispatchToProps = (dispatch) => {
    return({
        addNewVideo: (event, title, url) => {
            dispatch(addNewVideo(event, title, url))
        }
    })
}

export default connect(null, mapDispatchToProps)(AddVideoForm);