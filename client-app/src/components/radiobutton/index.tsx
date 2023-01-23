import { ChangeEvent } from 'react';
import { iControl } from '../../types'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

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
    <FormControlLabel value={props.control.value} control={
      <Radio id={props.control.id}
        name={props.control.name}
        value={props.control.value}
        data-checked={props.control.selected}
        // defaultChecked={props.control.selected}
        checked={props.control.selected}
        placeholder=""
        className='form-check-input'
        onChange={(e) => { handleClick(e) }}
      />} label={props.control.label} />
  )
}
