import { ChangeEvent } from 'react';
import { iControl } from '../../types'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

interface RadioButtonProps {
  callback: ({ id, val, currLevel, dataRelation }: { id: string, val: string, currLevel: number, dataRelation: string | undefined }) => void;
  control: iControl;
  level: number;
}

export const RadioButton = (props: RadioButtonProps) => {
  const handleClick = (e: ChangeEvent<HTMLInputElement>, dataProps: any) => {
    const dataRelation = dataProps.dataRelation;
    console.log(e.target.id, dataRelation);
    e.target.checked = true;
    props.callback({ id: e.target.id, val: e.target.value, currLevel: props.level, dataRelation });
  }
  return (
    <FormControlLabel value={props.control.value} control={
      <Radio id={props.control.id}
        name={props.control.name}
        value={props.control.value}
        data-checked={props.control.selected}
        data-relation = {props.control.relation}
        // defaultChecked={props.control.selected}
        checked={props.control.selected}
        placeholder=""
        className='form-check-input'
        onChange={(e) => { handleClick(e, { dataRelation: props.control.relation }) }}
      />} label={props.control.label} />
  )
}
