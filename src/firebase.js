import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDsw4K2iJLMmUp-xTnUr25Fz48QbBrEIxw",
    authDomain: "msngr-482d6.firebaseapp.com",
    databaseURL: "https://msngr-482d6.firebaseio.com",
    projectId: "msngr-482d6",
    storageBucket: "msngr-482d6.appspot.com",
    messagingSenderId: "262805758550",
    appId: "1:262805758550:web:a5daaa9636d047796d91f7",
    measurementId: "G-454E8GBRZ2"
})

const db = firebaseApp.firestore()

export default db