import { bgBG } from '@mui/material/locale';
import { uid } from 'uid';

export const signIn = (credentials) => {

  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then((resp) => {
      const storage = firebase.storage();
      return storage.ref(`images/${newUser.image.name}`).put(newUser.image)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL();  
        })
        .then((downloadURL) => {
          return firestore.collection('users').doc(resp.user.uid).set({
            name: newUser.name,
            SRN: `nss${newUser.branch}${uid()}`,
            Branch: newUser.branch,
            userType: newUser.type,
            phone: newUser.phone,
            address: newUser.address,
            email: newUser.email,
            gender: newUser.gender,
            semester: newUser.semester,
            father: newUser.father,
            mother: newUser.mother,
            dob: newUser.dob,
            bg: newUser.bg,
            teampresent: newUser.teampresent,
            nnsid : newUser.nnsid,
            image: downloadURL
          });
        });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      console.log(err);
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
  }
}