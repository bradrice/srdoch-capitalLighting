import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  QuerySnapshot,
  DocumentData,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firestore';
import { getAuth, signInAnonymously, UserCredential } from 'firebase/auth';
import {
  iAuditType,
  iControl,
  iControlRow,
  iSavedAudit,
  iSaveAudit,
  iSaveLocation,
  iSavedLocation
} from '../types';

const authenticate = async (): Promise<UserCredential> => {
  const auth = getAuth();
  const promise = await signInAnonymously(auth);
  return promise;
}

export const getControls = async () => {
  const auth = getAuth();
  signInAnonymously(auth)
    .then(async () => {
      await getDocs(collection(db, 'control')).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(newData);
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
}

export const getAuditTypes = async (): Promise<iAuditType[]> => {
  await authenticate();
  const collectionRef = collection(db, 'audit_type');
  const q = query(collectionRef, orderBy('order'));
  const querySnapshot = await getDocs(q);
  const docData = querySnapshot.docs.map((doc) => {
    return doc.data() as iAuditType;
  });
  return docData;
}

export const getControlsByRow = async (docid: string): Promise<iControl[]> => {
  const collectionRef = collection(db, 'control_row', docid, 'control');
  const q = query(collectionRef, orderBy('order'));
  await authenticate();
  const querySnapshot = await getDocs(q);
  const docData = querySnapshot.docs
    .map((doc) => {
      return doc.data() as iControl;
    });
  return docData;
}

export const setRowDoc = async (senddata: iSaveAudit) => {
  const auditId = senddata.auditId;
  console.log(senddata);
  await setDoc(doc(db, 'progress', auditId), {
    'controls-order': senddata.controlOrder,
    pageId: senddata.pageId,
    selectControls: senddata.selectControls,
    savedControlValues: senddata.savedControlValues
  });
}


export const getRowDoc = async (rowid: string): Promise<iControlRow> => {
  const docRef = doc(db, 'control_row', rowid);
  await authenticate();
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data() as iControlRow;
}

export const getAuditById = async (id: string): Promise<iSavedAudit> => {
  const docRef = doc(db, 'progress', id);
  await authenticate();
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data() as iSavedAudit;
}

export const getLocations = async () => {
  const collectionRef = collection(db, 'siteLocation');
  await authenticate();
  const querySnapshot = await getDocs(collectionRef);
  const docData = querySnapshot.docs
    .map((doc) => {
      return doc.data() as iSavedLocation;
    });
  return docData;
}

export const setLocation = async (senddata: iSaveLocation) => {
  const auditId = senddata.auditId;
  console.log(senddata);
  await addDoc(collection(db, 'siteLocation'), {
    auditId: senddata.auditId,
    locaton: senddata.location,
    typeId: senddata.typeId,
    id: senddata.id
  });
}
