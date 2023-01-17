const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firestore/caplight-18de7-2035aab712af.json');

initializeApp({
	credential: cert(serviceAccount)
});

const db = getFirestore();

const data = {
	"id": "ft3",
	"inputType": "radio",
	"label": "Pendant",
	"name": "fixture-type",
	"value": "pendant",
	"selected": false
};

// Add a new document in collection "cities" with ID 'LA'
const docRef = db.collection('control_row').doc('other-description').set(data);