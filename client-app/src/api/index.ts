import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  QuerySnapshot,
  DocumentData,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { iAuditType, iControl, iControlRow, iSavedAudit, iSaveAudit } from '../types';


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
  const auth = getAuth();
  await signInAnonymously(auth);
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
  const auth = getAuth();
  await signInAnonymously(auth);
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
  const auth = getAuth();
  await signInAnonymously(auth);
  const querySnapshot = await getDoc(docRef)
  console.log(querySnapshot.data());
  return querySnapshot.data() as iControlRow;
}

export const getAuditById = async (id: string): Promise<iSavedAudit> => {
  const docRef = doc(db, 'progress', id);
  const auth = getAuth();
  await signInAnonymously(auth);
  const querySnapshot = await getDoc(docRef);
  return querySnapshot.data() as iSavedAudit;
}
