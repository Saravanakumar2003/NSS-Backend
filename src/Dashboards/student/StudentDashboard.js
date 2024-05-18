import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import { connect } from 'react-redux';
import Home from './pages/Home'
import ErrorPage from '../../Errorpage';
import StudentForum from '../forum/StudentForum';
import Events from '../admin/pages/Events'
import Event from '../admin/pages/Event'
import Newsletter from '../teacher/pages/Newsletter';

const StudentDashboard = ({profile, auth}) => {
    if(!auth.uid) return <Redirect to="/login"></Redirect>   
    if(profile && profile.userType !== 'Student') return (<ErrorPage></ErrorPage>)

    return(
        <div>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/events" component={Events}></Route>
                        <Route exact path="/events/:event" component={Event}></Route>
                        <Route exact path="/forum" component={StudentForum}></Route>
                        <Route exact path="/newsletters" component={Newsletter}></Route>

                    </Switch>
            <Footer></Footer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile, 
    }
}

export default connect(mapStateToProps)(StudentDashboard);


