import { ChangeEvent } from 'react';
import { iControl } from '../../types'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

interface RadioButtonProps {
  callback: ({ id, val, currLevel }: { id: string, val: string, currLevel: number }) => void;
  control: iControl;
  level: number;
}

export const RadioButton = (props: RadioButtonProps) => {
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id);
    e.target.checked = true;
    props.callback({ id: e.target.id, val: e.target.value, currLevel: props.level });
  }
  return (
        <div key={props.control.id} className="form-check form-check-inline">
            <label htmlFor={props.control.id} className="form-check-label">{props.control.label}</label>
            <input
              id={props.control.id}
              name={props.control.name}
              type='radio'
              value={props.control.value}
              data-checked={props.control.selected}
              defaultChecked={props.control.selected}
              // checked={props.control.selected}
              placeholder=""
              className='form-check-input'
              onChange={(e) => { handleClick(e) }}
              />
        </div>
  )
}
