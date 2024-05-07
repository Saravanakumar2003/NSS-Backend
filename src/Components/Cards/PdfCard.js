import React from 'react'
import { Button, Card, CardTitle, Col} from 'reactstrap'
import { connect } from 'react-redux'
import {removePdf} from '../../Store/actions/newsletterActions'


const PdfCard = ({pdfs, event, removePdf, profile}) => {
    
        const pdfList = Array.isArray(pdfs) ? pdfs : [];
    
        const handleDelete = (event, title, url) => {
            removePdf(event,title, url)
        }
    
        return(
            <React.Fragment>
                {pdfList.map((pdf) => {
                    return(
                        <Col md='4' key={pdf.id}>
                            <Card className="event-card">
                                <CardTitle className="event-t"><strong>{pdf.title}</strong></CardTitle>
                                <Button color="primary" className="mr-3">
                                    <a href={pdf.url} target="_blank" rel="noreferrer" className="link">
                                        View
                                    </a>
                                </Button>
                                {profile.userType === 'Admin' ? <Button color="danger" className="card-button" onClick={(e) => handleDelete(e, pdf.title, pdf.url)}>Remove</Button> : null}
                            </Card>
                        </Col>
                    )
                })}
            </React.Fragment>
        )
    }

const mapStateToProps = (state) => {
    return{
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        removePdf: (event, title, url) => {
            dispatch(removePdf(event, title, url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (PdfCard);
