import firebase from "firebase/app"
import "firebase/firestore"
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "YourCreds",
    authDomain: "YourCreds",
    projectId: "YourCreds",
    storageBucket: "YourCreds",
    messagingSenderId: "YourCreds",
    appId: "YourCreds",
    measurementId: "YourCreds"
};

firebase.initializeApp(firebaseConfig)
const storageFiles = firebase.storage().ref('');
const storage = firebase.storage();
const databaseRef = firebase.database();
const collection = firebase.firestore().collection('TAG-BASE')

export { storageFiles,storage , databaseRef, collection, firebase as default };
