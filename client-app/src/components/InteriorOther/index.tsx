import { useEffect, useCallback, useState } from 'react';
import { Layout } from '../Layout'
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { setLevelByValue } from '../../store/level';
import { addControl, updateControl, updateFromSavedControl } from '../../store/rowcontrol';
import { setPageItems } from '../../store/progress';
import { TextInput } from '../textinput/';
import { RadioButton } from '../radiobutton';
import { getAuditById, getControlsByRow, getRowDoc } from '../../api';
import { iControl } from '../../types';

interface ComponentProps {
  auditId: string;
}

export const InteriorOther = (props: ComponentProps) => {
  // const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(true);
  const savedAuditId = useAppSelector(state => state.progress.auditId);
  const dispatch = useAppDispatch();
  // const level = useAppSelector((state) => state.level);
  const rowcontrol = useAppSelector((state) => state.rowcontrol);
  const savedAuditData = useAppSelector(state => state.progress);
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
    return await getAuditById('22').then(data => {
      setIsSaved(true);
      const controlOrder = data['controls-order'];
      const selectedControls = data.selectControls;
      dispatch(setPageItems({ auditId: '', pageId: 'interiorother', controlOrder, savedControls: selectedControls }))
      console.log('set page items');
      // data['controls-order'].forEach((control, index) => {
      //   const id = selectedControls[control];
      //   console.log(id, index);
      // });
    });
  }, []);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      void getSavedAudit();
      if (!isSaved) {
        void fetchControl('fixture_type', 0);
      }
    }
  }, []);

  useEffect(() => {
    if (isSaved && savedAuditId === props.auditId) {
      savedAuditData.controlOrder.forEach((controlId, index) => {
        void fetchControl(controlId, index);
      })
    }
  }, [isSaved, savedAuditData, props.auditId])

  useEffect(() => {
    const savedControlMap = savedAuditData.savedControls;
    console.log('update control');
    if (rowcontrol.length === savedAuditData.controlOrder.length) {
      savedAuditData.controlOrder.forEach((controlId, index) => {
        console.log(controlId);
        dispatch(updateFromSavedControl({ id: savedControlMap[controlId], currLevel: index }));
      })
    }
  }, [rowcontrol])

  const handleControlEntry = ({ id, val, currLevel }: { id: string, val: string, currLevel: number }) => {
    console.log(val, id, currLevel);
    // dispatch(updateControl({id, currLevel}));
    dispatch(updateControl({ id, currLevel }));
    void fetchControl(val, currLevel);
  }
  const handleInputEntry = ({ id, val, currLevel }: { id: string, val: string, currLevel: number }) => {
    console.log(val, id);
    void fetchControl(id, currLevel);
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
