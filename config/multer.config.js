const { credential } = require('firebase-admin');
const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config');
const serviceAcc = require('../drive-7477-firebase-adminsdk-3k5hc-a2d93f1f19.json')

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAcc),
    storageBucket: 'drive-7477',
    unique: true
})

const upload = multer({
    storage: storage,
})

module.exports = router;