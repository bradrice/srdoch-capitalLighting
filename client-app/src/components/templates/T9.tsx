import { useEffect } from 'react';
import { TemplateProps } from '../../types/';
import { useAppDispatch } from '../../store';
import { setLevelByValue } from '../../store/level';



export const T9 = (props: TemplateProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(props.data?.control);
    dispatch(setLevelByValue(0))
  }, []);

  const handleRadioClick = (val: any) => {
    console.log(val);
  }

  return (
      <form>
      <div className="row">
        <div className="col-sm-12">
        {props.data?.control[0].formControl?.map(formControl => {
          return (<div key={formControl.id} className="form-check form-check-inline">
            <input id={formControl.id} name="controls" type={formControl.inputType} placeholder="" className={formControl.inputType === 'radio' ? 'form-check-input' : 'form-control'}
            onClick={() => { handleRadioClick({ level: props.data?.control[0].level, value: formControl.value }) }} />
            <label htmlFor={formControl.name} className="form-label">{formControl.label}</label>
</div>
          )
        })}
        </div>
</div>
      </form>
  )
}
