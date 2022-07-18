  //lib/firebase-admin.js

  import * as admin from 'firebase-admin';
  var serviceAccount = require("dotted-saga-352400-firebase-adminsdk-w5bhq-529440095e.json");
  if (!admin.apps.length) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount)});
  }

  const firestore = admin.firestore();
  const auth = admin.auth();

  export { firestore, auth }