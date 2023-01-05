import { useEffect, useCallback } from 'react';
import { TemplateProps } from '../../types/';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setLevelByValue } from '../../store/level';
import { updateControl, addNewControl } from '../../store/control';
// import { setCurrentId } from '../../store/progress';
import { TextInput } from '../textinput/';
import { RadioButton } from '../radiobutton/';
import { useNavigate } from 'react-router-dom';



export const T9 = (props: TemplateProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const level = useAppSelector((state) => state.level);
  const control = useAppSelector((state) => state.control);
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

  const fetchControl = useCallback((url: string) => {
    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        console.log(data);
        dispatch(addNewControl({ control: data, level }));
      })
      .catch((err) => {
        console.log(err.message);
        const error = new Error(err.message)
        throw error;
      })
  }, []);

  useEffect(() => {
    console.log(props.data?.control);
    dispatch(setLevelByValue(1))
  }, []);

  useEffect(() => {
    console.log('level changed', level);
    if (props.data?.control[0].formControl !== undefined) {
      const id: string = props.data?.control[0].formControl;
      const url = `/data/controls/${id}.json`;
      console.log(url);
      if (url != null) {
        fetchControl(url)
      }
    }
  }, []);

  const handleControlEntry = ({ id, val, currLevel }: { id: string, val: string, currLevel: number }) => {
    if (val === undefined || val === '') return;
    if (val === '5-1-1-1-1-1-2') {
      navigate('/audit/interiorother');
      return;
    }
    const parentId = val.slice(0, -2);
    console.log(val, parentId);
    dispatch(updateControl({ id, parentId }));
    fetch(`/data/controls/${val}.json`)
      .then(async res => await res.json())
      .then(data => {
        // dispatch(addControl(data));
        dispatch(addNewControl({ control: data, level: currLevel }))
      })
      .catch((err) => {
        console.log(err.message);
        const error = new Error(err.message)
        throw error;
      })
  }

  return (
      <form>

              {control.map((formControl, cntrlIndex) => {
                return (
                  <div key={formControl.id} className="row">
                    <div className="col-sm-12">
                      <h3>{formControl.label}</h3>
                  {formControl.control.map((formControl) => {
                    return (formControl.inputType === 'radio'
                      ? <RadioButton control={formControl} callback={handleControlEntry} level={cntrlIndex} key={formControl.id} />
                      : <TextInput control={formControl} callback={handleControlEntry} level={cntrlIndex} key={formControl.id} />)
                  }
                  )}
                  <hr />
                </div>
              </div>
                )
              })}

      </form>
  )
}
