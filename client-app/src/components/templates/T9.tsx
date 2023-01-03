import { useEffect, useCallback } from 'react';
import { TemplateProps } from '../../types/';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setLevelByValue } from '../../store/level';
import { addControl, updateControl } from '../../store/control';
// import { setCurrentId } from '../../store/progress';
import { TextInput } from '../textinput/';
import { RadioButton } from '../radiobutton/';



export const T9 = (props: TemplateProps) => {
  // const [currentValue, setCurrentValue] = useState<string | undefined>('');
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
        dispatch(addControl(data));
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

  const handleControlEntry = ({ id, val }: { id: string, val: string }) => {
    if (val === undefined || val === '') return;
    const parentId = val.slice(0, -2);
    console.log(val, parentId);
    dispatch(updateControl({ id, parentId }));
    fetch(`/data/controls/${val}.json`)
      .then(async res => await res.json())
      .then(data => {
        dispatch(addControl(data));
      })
      .catch((err) => {
        console.log(err.message);
        const error = new Error(err.message)
        throw error;
      })
  }

  return (
      <form>

              {control.map((formControl) => {
                return (
                  <div key={formControl.id} className="row">
                    <div className="col-sm-12">
                  {formControl.control.map((formControl) => {
                    return (formControl.inputType === 'radio'
                      ? <RadioButton control={formControl} callback={handleControlEntry} level={level} key={formControl.id} />
                      : <TextInput control={formControl} callback={handleControlEntry} level={level} key={formControl.id} />)
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
