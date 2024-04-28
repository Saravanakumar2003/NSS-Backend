import { storage } from "../../config/fbConfig";
import { uid } from 'uid';
import firebase from 'firebase/app';

export const addEvent = (event) => {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            const firestore = getFirestore();



            firestore
                .add({collection: 'events'},
                    {
                        eventId: `${uid()}`,
                        title: event.title,
                        description: event.description,
                        place: event.place,
                        date: event.date,
                        time: event.time,
                        branch: event.branch,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        videos: [],
                        references: [],
                    })
                    .then((dispatch)=>{
                        dispatch({type:'CREATE_COURSE'});
                    }).catch((err)=>{
                        dispatch({type:'CREATE_COURSE_ERROR'});
                    });   
                
        }
}

export const removeEvent = (event) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('events')
            .doc(event.id)
            .delete()
            .then(() => {
                dispatch({
                    type: 'REMOVED_COURSE'
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'REMOVE_TASK_ERR',
                    err
                })
            })
    }
}


export const addNewVideo = (event, title, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('events')
            .doc(event[0].id)
            .update({
                videos: firebase.firestore.FieldValue.arrayUnion({
                    name: title,
                    url: url
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}



export const removeVideo = (event, title, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('events')
            .doc(event[0].id)
            .update({
                videos: firebase.firestore.FieldValue.arrayRemove({
                    name: title,
                    url: url
                })
            })
            .then(() => {
                var deleteTask = storage.ref().child(`eventVideos/${title}`)
                deleteTask.delete().then(() => {
                    console.log('Deleted File')
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}


export const addResource = (event, title, url)  => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();


        firestore
            .collection('events')
            .doc(event[0].id)
            .update({
                references: firebase.firestore.FieldValue.arrayUnion({
                    name: title,
                    url: url
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}


export const removeResource = (event, title, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('events')
            .doc(event[0].id)
            .update({
                references: firebase.firestore.FieldValue.arrayRemove({
                    name: title,
                    url: url
                })
            })
            .then(() => {
                var deleteTask = storage.ref().child(`eventResources/${title}`)
                deleteTask.delete().then(() => {
                    console.log('Deleted File')
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}