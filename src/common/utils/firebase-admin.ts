  //lib/firebase-admin.js

  import * as admin from 'firebase-admin';

  if (!admin.apps.length) {
    admin.initializeApp();
  }

  const firestore = admin.firestore();
  const auth = admin.auth();

  export { firestore, auth }