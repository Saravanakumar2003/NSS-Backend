import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import { connect } from 'react-redux';
import ErrorPage from '../../Errorpage';
import TeacherOverview from './pages/TeacherOverview';
import CustomAlert from '../../Components/Alert';
import Events from '../admin/pages/Events';
import Event from '../admin/pages/Event';
import StudentForum from '../forum/StudentForum';
import Newsletter from './pages/Newsletter';




const TeacherDashboard = ({profile, auth, authSuccess}) => {
    if(!auth.uid) return <Redirect to="/login"></Redirect>   
    if(profile.userType !== 'Teacher') return (<ErrorPage></ErrorPage>)

    return(
        <div>
            {authSuccess && <CustomAlert alert={authSuccess}></CustomAlert>}
            <Switch>
                    <Route exact path="/" component={TeacherOverview}></Route>
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
        authSuccess: state.auth.authSuccess,
    }
}

export default connect(mapStateToProps)(TeacherDashboard);

