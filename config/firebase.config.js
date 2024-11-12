const Firebase = require('firebase-admin')
const serviceAcc = require('../drive-17138-firebase-adminsdk-xv9a4-c6b517c33f.json')

const firebase = Firebase.initializeApp({
    credential: firebase.credential.cert(serviceAcc),
    storageBucket: 'drive-7477'
})

module.exports = Firebase;