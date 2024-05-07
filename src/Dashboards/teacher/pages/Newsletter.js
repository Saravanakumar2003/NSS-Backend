import React from 'react'
import { useParams } from 'react-router'
import { Container } from 'reactstrap'
import NewsletterContainer from '../../../Components/Containers/NewsletterContainer';

const Newsletter = () => {
    const {newsletter} = useParams();

    return(
        <Container>
            <h2 className="table-title mt-3 mb-3 p-3">Newsletters</h2>
            <NewsletterContainer title={newsletter}></NewsletterContainer>
        </Container>
    )
}

export default Newsletter;