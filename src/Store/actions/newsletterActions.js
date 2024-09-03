import { storage } from "../../config/fbConfig";

//Newsletters Actions

export const addNewsletter = (newsletter) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        console.log('addNewsletter function called with:', newsletter);

        const firestore = getFirestore();
        const firebase = getFirebase();
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`newsletters/${newsletter.file.name}`);

        fileRef.put(newsletter.file)
            .then((snapshot) => {
                console.log('File uploaded successfully:', snapshot);
                return snapshot.ref.getDownloadURL();
            })
            .then((url) => {
                console.log('File URL obtained:', url);
                return firestore
                    .collection('newsletters')
                    .add({
                        title: newsletter.title,
                        desc: newsletter.desc,
                        file: url,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
            })
            .then(() => {
                console.log('Newsletter added to Firestore');
                dispatch({
                    type: 'ADDED_NEWSLETTER'
                });
            })
            .catch((err) => {
                console.error('Error adding newsletter:', err);
                dispatch({
                    type: 'ADD_NEWSLETTER_ERR',
                    err
                });
            });
    };
};

export const deleteNewsletter = (newsletter) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

            firestore
                .collection('newsletters')
                .doc(newsletter.id)
                .delete()
                .then(() => {
                    dispatch({
                        type: 'REMOVED_NEWSLETTER'
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: 'REMOVE_NEWSLETTER_ERR',
                        err
                    })
                }
            )
    }
}