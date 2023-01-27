import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addControl, updateControl, updateFromSavedControl, updateTextControl, initializeRows } from '../../store/rowcontrol';
import { setIsSaved, setPageItems, initializeProgress, setProgressId } from '../../store/progress';
import { TextInput } from '../textinput/';
import { RadioButton } from '../radiobutton';
import { getAuditById, getControlsByRow, getRowDoc } from '../../api';
import { iControl } from '../../types';
import { TemplateProps } from '../../types/';

const getObjValueByKey = (obj: any, key: string) => {
  console.log('getting from object', key, obj);
  return obj[key];
}

function isEmptyObject(obj: any) {
  return JSON.stringify(obj) === '{}'
}

export const T9 = (props: TemplateProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const level = useAppSelector((state) => state.level);
  const progressId = useAppSelector(state => state.progress.progressId);
  // const control = useAppSelector((state) => state.control);
  // const currentId = useAppSelector((state) => state.progress.currentId);
  // const [url, setUrl] = useState('');


  // const createFetch = () => {
  // // Create a cache of fetches by URL
  //   const fetchMap: Record<string, Promise<SubControl>> = {};

  //   return async (url: string) => {
  //   // Check to see if its not in the cache otherwise fetch it
  //     console.log('in createFetch', url);
  //     if (fetchMap[url] !== undefined) {
  //       fetchMap[url] = await fetch(url).then(async (res) => await res.json());
  //     }

  //     // Return the cached promise
  //     console.dir(fetchMap);
  //     return await fetchMap[url];
  //   };
  // };

  // const myFetch = createFetch();

  // const fetchControl = useCallback((url: string) => {
  //   fetch(url)
  //     .then(async res => await res.json())
  //     .then(data => {
  //       console.log(data);
  //       dispatch(addNewControl({ control: data, level }));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       const error = new Error(err.message)
  //       throw error;
  //     })
  // }, []);

  // useEffect(() => {
  //   console.log(props.data?.control);
  //   dispatch(setLevelByValue(1))
  // }, []);

  // useEffect(() => {
  //   console.log('level changed', level);
  //   if (props.data?.control[0].formControl !== undefined) {
  //     const id: string = props.data?.control[0].formControl;
  //     const url = `/data/controls/${id}.json`;
  //     console.log(url);
  //     if (url != null) {
  //       fetchControl(url)
  //     }
  //   }
  // }, []);

  const isSaved = useAppSelector(state => state.progress.isSaved);
  const savedAuditId = useAppSelector(state => state.progress.auditId);
  // const level = useAppSelector((state) => state.level);
  const rowcontrol = useAppSelector((state) => state.rowcontrol);
  const savedAuditData = useAppSelector(state => state.progress);
  const savedControlValueObj = useAppSelector(state => state.progress.savedControlValues);
  // const progress = useAppSelector((state) => state.progress);
  // const [rowId] = useState<string[]>(['fixture_type'])
  let didInit = false;

  const fetchControl: (docid: string, rowIndex: number) => Promise<void> = useCallback(async (docid: string, rowIndex: number) => {
    console.log('fetch control', docid, rowIndex);
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
      if (isSaved !== null && isSaved === false) {
        console.log('fetch controls');
        void fetchControl('interior-fixture-type', 0);
      }
    }
  }, []);

  useEffect(() => {
    console.log('trying to fetch', isSaved, savedAuditId, progressId);
    if (isSaved !== null && isSaved === true) {
      console.log('fetch');
      savedAuditData.controlOrder.forEach((controlId, index) => {
        void fetchControl(controlId, index);
      })
    }
  }, [isSaved, savedAuditData, props.auditId])

  useEffect(() => {
    const savedControlMap = savedAuditData.savedControls;
    console.log(savedControlValueObj);
    if (isEmptyObject(savedAuditData)) return;
    if (rowcontrol.length > 0 && rowcontrol.length === savedAuditData.controlOrder.length) {
      savedAuditData.controlOrder.forEach((controlId, index) => {
        const lookupkey = savedControlMap[controlId]
        const val = getObjValueByKey(savedControlValueObj, lookupkey);
        console.log('retrieved', val);
        dispatch(updateFromSavedControl({ id: savedControlMap[controlId], currLevel: index, value: val }));
      })
    }
  }, [rowcontrol])

  const handleControlEntry = ({ id, val, currLevel, dataRelation }: { id: string, val: string, currLevel: number, dataRelation: string | undefined }) => {
    console.log(val, id, currLevel, dataRelation);
    if (dataRelation === 'interiorother') {
      dispatch(initializeProgress());
      dispatch(initializeRows());
      dispatch(setProgressId('interiorother'));
      navigate('/audit/interiorother');
      return;
    }
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

  // const handleControlEntry = ({ id, val, currLevel }: { id: string, val: string, currLevel: number }) => {
  //   if (val === undefined || val === '') return;
  //   console.log(val);
  //   if (val === 'interiorother') {
  //     navigate('/audit/interiorother');
  //     return;
  //   }
  //   const parentId = val.slice(0, -2);
  //   console.log(val, parentId);
  //   dispatch(updateControl({ id, parentId }));
  //   fetch(`/data/controls/${val}.json`)
  //     .then(async res => await res.json())
  //     .then(data => {
  //       // dispatch(addControl(data));
  //       dispatch(addNewControl({ control: data, level: currLevel }))
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       const error = new Error(err.message)
  //       throw error;
  //     })
  // }

  return (
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
  )
}
