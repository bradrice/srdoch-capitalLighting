const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firestore/caplight-18de7-2035aab712af.json');

initializeApp({
	credential: cert(serviceAccount)
});

const db = getFirestore();

var control = [
	{
		"id": "otherdesc",
		"inputType": "radio",
		"label": "Lay-in",
		"name": "other-description",
		"value": "Lay-in",
		"selected": false,
		"order" : 1,
		relation: "other-description"
	},
]

control.forEach(function (obj) {
	db.collection("control_row").doc('other-description').collection('control').add({
		id: obj.id,
		inputType: obj.inputType,
		label: obj.label,
		name: obj.name,
		value: obj.value,
		selected: obj.selected,
		order: obj.order,
		relation: obj.relation
	}).then(function (docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
		.catch(function (error) {
			console.error("Error adding document: ", error);
		});
});