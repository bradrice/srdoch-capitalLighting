import { useEffect, useCallback } from 'react';
import { Layout } from '../Layout'
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { setLevelByValue } from '../../store/level';
import { addControl } from '../../store/rowcontrol';
// import { setCurrentId } from '../../store/progress';
import { TextInput } from '../textinput/';
import { RadioButton } from '../radiobutton';
import { getControlsByRow, getRowDoc } from '../../api';
import { iControl } from '../../types';

export const InteriorOther = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const level = useAppSelector((state) => state.level);
  const rowcontrol = useAppSelector((state) => state.rowcontrol);
  // const [rowId] = useState<string[]>(['fixture_type'])

  const fetchControl: (docid: string, rowIndex: number) => Promise<void> = useCallback(async (docid: string, rowIndex: number) => {
    const rowDoc = await getRowDoc(docid);
    getControlsByRow(docid).then((data) => {
      console.log(data);
      dispatch(addControl({ control: data, rowid: docid, rowTitle: rowDoc.title, rowIndex }))
    })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    void fetchControl('fixture_type', 0);
  }, [])

  const handleControlEntry = ({ id, val, currLevel }: { id: string, val: string, currLevel: number }) => {
    console.log(val, id, currLevel);
    // dispatch(updateControl({id, currLevel}));
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
    <Layout>
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
