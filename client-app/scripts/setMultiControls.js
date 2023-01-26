const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firestore/caplight-18de7-3072fea18073.json');


initializeApp({
	credential: cert(serviceAccount)
});

const db = getFirestore();

var control = [
	{
		"id": "ft-1",
		"inputType": "radio",	
		"label": "Compact Flourescent",
		"name": "fixture-technology",
		"value": "Compact Flourescent",
		"selected": false,
		"order" : 1,
		relation: "fixture-technology"
	},
	{
		"id": "ft-2",
		"inputType": "radio",
		"label": "Linear Flourescent",
		"name": "fixture-technology",
		"value": "Linear Flourescent",
		"selected": false,
		"order": 2,
		relation: "fixture-technology"
	},
	{
		"id": "ft-3",
		"inputType": "radio",
		"label": "Incandescent",
		"name": "fixture-technology",
		"value": "Incandescent",
		"selected": false,
		"order": 3,
		relation: "fixture-technology"
	},
	{
		"id": "ft-4",
		"inputType": "radio",
		"label": "Halogen",
		"name": "fixture-technology",
		"value": "Halogen",
		"selected": false,
		"order": 4,
		relation: "fixture-technology"
	},
	{
		"id": "ft-5",
		"inputType": "radio",
		"label": "Metal Halide",
		"name": "fixture-technology",
		"value": "Metal Halide",
		"selected": false,
		"order": 5,
		relation: "fixture-technology"
	},
	{
		"id": "ft-6",
		"inputType": "radio",
		"label": "LED Replacement Lamp",
		"name": "fixture-technology",
		"value": "LED Replacement Lamp",
		"selected": false,
		"order": 6,
		relation: "fixture-technology"
	},
	{
		"id": "ft-7",
		"inputType": "radio",
		"label": "Integrated LED",
		"name": "fixture-technology",
		"value": "Integrated LED",
		"selected": false,
		"order": 7,
		relation: "fixture-technology"
	},
	{
		"id": "ft-8",
		"inputType": "radio",
		"label": "Other",
		"name": "fixture-technology",
		"value": "Other",
		"selected": false,
		"order": 8,
		relation: "interiorother"
	},
	{
		"id": "ft-9",
		"inputType": "radio",
		"label": "Exit Bug",
		"name": "fixture-technology",
		"value": "Exit Bug",
		"selected": false,
		"order": 9,
		relation: "fixture-technology"
	},
]

control.forEach(function (obj) {
	db.collection("control_row").doc('fixture-technology').collection('control').add({
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