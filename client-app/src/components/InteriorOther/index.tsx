import { useEffect, useCallback, useState } from 'react';
import { Layout } from '../Layout'
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { setLevelByValue } from '../../store/level';
import { addControl, updateControl, updateFromSavedControl, updateTextControl } from '../../store/rowcontrol';
import { setPageItems, setIsSaved } from '../../store/progress';
import { TextInput } from '../textinput/';
import { RadioButton } from '../radiobutton';
import { getAuditById, getControlsByRow, getRowDoc } from '../../api';
import { iControl } from '../../types';

interface ComponentProps {
  auditId: string;
}

const getObjValueByKey = (obj: any, key: string) => {
  console.log('getting from object', key, obj);
  return obj[key];
}

function isEmptyObject(obj: any) {
  return JSON.stringify(obj) === '{}'
}

// function isEmptyObject(obj: {}) {
//   return JSON.stringify(obj) === '{}'
// }

export const InteriorOther = (props: ComponentProps) => {
  // const navigate = useNavigate();
  const isSaved = useAppSelector(state => state.progress.isSaved)
  const savedAuditId = useAppSelector(state => state.progress.auditId);
  const dispatch = useAppDispatch();
  // const level = useAppSelector((state) => state.level);
  const rowcontrol = useAppSelector((state) => state.rowcontrol);
  const savedAuditData = useAppSelector(state => state.progress);
  const savedControlValueObj = useAppSelector(state => state.progress.savedControlValues);
  const progressId = useAppSelector(state => state.progress.progressId);
  // const progress = useAppSelector((state) => state.progress);
  // const [rowId] = useState<string[]>(['fixture_type'])
  let didInit = false;

  const fetchControl: (docid: string, rowIndex: number) => Promise<void> = useCallback(async (docid: string, rowIndex: number) => {
    const rowDoc = await getRowDoc(docid);
    getControlsByRow(docid).then((data) => {
      if (data !== undefined) {
        dispatch(addControl({ control: data, rowid: docid, rowTitle: rowDoc.title, rowIndex }))
      }
    })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getSavedAudit = useCallback(async () => {
    console.log('getting saved audit by progress id', progressId);
    return await getAuditById(progressId).then(data => {
      console.log(data);
      if (isEmptyObject(data) || data === undefined) return;
      const controlOrder = data['controls-order'];
      const selectedControls = data.selectControls;
      const savedControlValues = data.savedControlValues;
      dispatch(setPageItems({ pageId: savedAuditData.pageId, controlOrder, savedControls: selectedControls, savedControlValues }))
      dispatch(setIsSaved(true));
    });
  }, []);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void getSavedAudit();
      if (isSaved === false) {
        void fetchControl('fixture_type', 0);
      }
    }
  }, []);

  useEffect(() => {
    if (isSaved !== null && savedAuditId === props.auditId) {
      savedAuditData.controlOrder.forEach((controlId, index) => {
        void fetchControl(controlId, index);
      })
    }
  }, [isSaved, savedAuditData, props.auditId])

  useEffect(() => {
    const savedControlMap = savedAuditData.savedControls;
    // const savedControlValueObj = savedAuditData.savedControlValues;
    console.log(savedControlValueObj);
    if (rowcontrol.length === savedAuditData.controlOrder.length) {
      savedAuditData.controlOrder.forEach((controlId, index) => {
        const lookupkey = savedControlMap[controlId]
        const val = getObjValueByKey(savedControlValueObj, lookupkey);
        console.log('retrieved', val);
        dispatch(updateFromSavedControl({ id: savedControlMap[controlId], currLevel: index, value: val }));
      })
    }
  }, [rowcontrol])

  const handleControlEntry = ({ id, val, currLevel, dataRelation }: { id: string, val: string, currLevel: number, dataRelation: string | undefined }) => {
    console.log(val, id, currLevel);
    // dispatch(updateControl({id, currLevel}));
    dispatch(updateControl({ id, currLevel, value: val }));
    if (dataRelation !== undefined) {
      void fetchControl(dataRelation, currLevel);
    }
  }
  const handleInputEntry = ({ id, val, currLevel, dataRelation }: { id: string, val: string, currLevel: number, dataRelation: string | undefined }) => {
    console.log(val, dataRelation);
    dispatch(updateTextControl({ id, currLevel, value: val }));
    if (dataRelation !== undefined) {
      void fetchControl(dataRelation, currLevel);
    }
  }

  const renderInput = (formControl: iControl, cntrlIndex: number) => {
    switch (formControl.inputType) {
      case 'radio':
        return <RadioButton control={formControl} callback={handleControlEntry} level={cntrlIndex} key={formControl.id} />
      case 'text':
        return <TextInput control={formControl} callback={handleInputEntry} relation={formControl.relation} level={cntrlIndex} key={formControl.id} />
    }
  }

  return (
    <Layout pageId="interiorother">
      <h1>New Interior Fixture</h1>
      <p>Begin the survey by selecting an option below. Based on your selection, a new set of questions will drop-down and allow you to advance through the survey. All questions must be answered. You cannot skip questions.Selections cannot be saved until all appropriate selections are made and photos uploaded.</p>
      <form>
        {rowcontrol.map((formControl, cntrlIndex) => {
          return (
            <div key={formControl.rowid} className="row">
              <div className="col-sm-12">
                <h3>{formControl.rowTitle}</h3>
            {formControl.control.map((formControl, index) => {
              return renderInput(formControl, cntrlIndex);
            })}
            <hr />
          </div>
        </div>
          )
        })}
    </form>
  </Layout>
  )
}
