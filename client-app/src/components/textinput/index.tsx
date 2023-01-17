import { useState, KeyboardEvent, ChangeEvent } from 'react';

export const TextInput = (props: any) => {
  const [inputVal, setInputVal] = useState('');
  const [dataRelation, setDataRelation] = useState<string | undefined>('')

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      console.log('Tab or Enter', inputVal, dataRelation);
      props.callback({ id: dataRelation, val: inputVal, currLevel: props.level });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('a chnage occured', e.currentTarget.dataset);
    setInputVal(e.currentTarget.value);
    setDataRelation(e.currentTarget.dataset.relation);
  }
  return (
    <div key={props.control.id} className="form-group">
                    <label htmlFor={props.control.name} className="form-label">{props.control.label}
              </label>
              <input
              id={props.control.id}
              name="controls"
              type='text'
              value={inputVal}
              data-relation={props.control.relation}
              onChange={handleChange}
              placeholder="" className='form-control'
              onKeyDown={onKeyDown} />

  </div>
  )
}
