const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBPFkpoRORH0nXnklB8zwhPuANIgODgLEE",
    authDomain: "caplight-18de7.firebaseapp.com",
    projectId: "caplight-18de7"
  });
  
var db = firebase.firestore();

var control = [
        {
            "id": "5-1-1",
            "inputType": "radio",
            "label": "Cove",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-2",
            "inputType": "radio",
            "label": "High Bay",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-3",
            "inputType": "radio",
            "label": "Pendant",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-4",
            "inputType": "radio",
            "label": "Recessed",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-5",
            "inputType": "radio",
            "label": "Sconce",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-6",
            "inputType": "radio",
            "label": "Shelf/Strip Light",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-7",
            "inputType": "radio",
            "label": "Troffer",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-8",
            "inputType": "radio",
            "label": "Track Head",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-9",
            "inputType": "radio",
            "label": "Wallpak",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-10",
            "inputType": "radio",
            "label": "Emergency",
            "name": "5-1",
            "value": "5-1-1",
            "selected": false
        },
        {
            "id": "5-1-11",
            "inputType": "radio",
            "label": "Other",
            "name": "5-1",
            "value": "5-1-2",
            "selected": false
        }
    ]

menu.forEach(function(obj) {
    db.collection("control").add({
        id: obj.id,
        inputType: obj.inputType,
        label: obj.label,
        name: obj.name,
        value: obj.value,
        selected: obj.selected
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});