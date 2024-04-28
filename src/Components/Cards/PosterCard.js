import React from 'react'
import { Button, Card, CardTitle, Col, Row, CardImg} from 'reactstrap'
import { removeResource } from '../../Store/actions/eventActions';
import { connect } from 'react-redux'

const ResourceCard = ({resources, event, profile, removeResource}) => {

    const resourceList = resources || [];

    const handleDelete = (event, title, url) => {
        removeResource(event,title, url)
    }

    return(
        <Row>
            {resourceList.map((r) => (
                <React.Fragment key={r.id}>
                    <Col md="5">
                        <Card className="image-card mb-3">
                            <CardImg top className="mb-3 mt-2" src={r.url} alt="Card image cap" />
                            <CardTitle className="video-title">{r.name}</CardTitle>
                            { profile.userType == "Student" ? null : 
                            <Button color="danger" className="button w-25" onClick={() => handleDelete(event, r.name, r.url)}>Remove</Button>
                            }                               
                        </Card>
                    </Col>
                </React.Fragment>
            ))}
        </Row>
    )
}

const mapStateToProps = (state) => {
    return{
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        removeResource: (event, title, url) => {
            dispatch(removeResource(event, title, url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCard);