import { addDoc, collection } from '@firebase/firestore';
import { db } from '../firestore';

const handleSubmit = async (testdata: string) => {
  const ref = collection(db, 'test_data');

  const data = {
    testData: testdata
  }

  try {
    await addDoc(ref, data)
  } catch (err) {
    console.log(err)
  }
}

export default handleSubmit;
