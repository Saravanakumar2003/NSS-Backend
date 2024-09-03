import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import { addNewsletter } from '../../Store/actions/newsletterActions';

const AddNewsletterForm = ({ addNewsletter }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNewsletter({ title, desc, file }, setUploadProgress);
            setUploadStatus('Upload successful');
        } catch (error) {
            setUploadStatus('Upload failed');
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="Enter the title of the newsletter" onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="desc">Description</Label>
                <Input type="textarea" name="desc" id="desc" placeholder="Enter the description of the newsletter" onChange={(e) => setDesc(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="file">File</Label>
                <Input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </FormGroup>
            <Button color="primary">Submit</Button>
            {uploadStatus && <p>{uploadStatus}</p>}
            {uploadProgress > 0 && <Progress value={uploadProgress} max="100">{uploadProgress}%</Progress>}
        </Form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewsletter: (newsletter) => {
            dispatch(addNewsletter(newsletter))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddNewsletterForm);

