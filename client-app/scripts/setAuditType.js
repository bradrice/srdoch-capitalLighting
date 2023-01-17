const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firestore/caplight-18de7-2035aab712af.json');

initializeApp({
	credential: cert(serviceAccount)
});

const db = getFirestore();

const data = {
	"id": "5",
	"template": "T9",
	"heading": "New Interior Fixture",
	"subhead": "",
	"instruction": "Begin the survey by selecting an option below. Based on your selection, a new set of questions will drop-down and allow you to advance through the survey. All questions must be answered. You cannot skip questions.",
	"control": ["5-1"]
}

// Add a new document in collection "cities" with ID 'LA'
const docRef = db.collection('audit_type').doc().set(data);