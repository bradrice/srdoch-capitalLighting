import { KeyboardEvent } from 'react';

export const TextInput = (props: any) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      console.log('Tab');
      props.callback(e.currentTarget.value, props.level)
    }
  };
  return (
    <div key={props.control.id} className="form-group">
                    <label htmlFor={props.control.name} className="form-label">{props.control.label}
              </label>
              <input id={props.control.id} name="controls" type='text' placeholder="" className='form-control'
               onKeyDown={onKeyDown} />

  </div>
  )
}
