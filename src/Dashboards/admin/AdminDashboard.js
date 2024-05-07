import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Overview from './pages/Overview'
import Students from './pages/Students'
import Student from './pages/Student';
import CustomAlert from '../../Components/Alert';
import Events from './pages/Events';
import Event from './pages/Event';
import Teachers from './pages/Teachers';
import Admins from './pages/Admins';
import Teacher from './pages/Teacher';
import Newsletter from '../teacher/pages/Newsletter';




const AdminDashboard = ({auth, upload, authSuccess}) => {

    if(!auth.uid) return <Redirect to="/login"></Redirect>   

    
    return(
        <div>
            {authSuccess && <CustomAlert alert={authSuccess}></CustomAlert>}
            <Switch>
                    <Route exact path="/" component={Overview}></Route>
                    <Route exact path="/students" component={Students}></Route>
                    <Route exact path="/teachers" component={Teachers}></Route>
                    <Route exact path="/students/:student" component={Student}></Route>
                    <Route exact path="/teachers/:teacher" component={Teacher}></Route>
                    <Route exact path="/events" component={Events}></Route>
                    <Route exact path="/events/:event" component={Event}></Route>
                    <Route exact path="/admins" component={Admins}></Route>
                    <Route exact path="/newsletters" component={Newsletter}></Route>
            </Switch>
            <Footer></Footer>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authSuccess: state.auth.authSuccess,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(AdminDashboard);



