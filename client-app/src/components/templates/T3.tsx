import { useReducer, useEffect } from 'react';
import { TemplateProps, Controls } from '../../types/';
import { Formik, Field, Form } from 'formik';

import './template.scss';

interface State {
  controls: any[][];
  level: number;
}

const initialState = { controls: [], level: 0 };

interface ControlsAction {
  type: string;
  payload: { controls: Controls[], level: number };
}

function reducer(state: State, action: ControlsAction): State {
  const { type, payload } = action;
  switch (type) {
    case 'addControls':
      state.controls[payload.level] = payload.controls;
      return { ...state, level: payload.level };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}


export const T3 = (props: TemplateProps) => {
  const [controlState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (props.data !== undefined) {
      console.log('add controls');
      dispatch({ type: 'addControls', payload: { controls: props.data?.controls, level: 1 } });
    }
    console.dir(controlState)
  }, [props.data]);

  return (
    <>
      <h2>{props.data?.heading}</h2>
      <h3>
        {props.data?.subhead}
      </h3>
      <p>{controlState.level}</p>
        <Formik
    initialValues={{
      picked: ''
    }}
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
      <div className="row">
        <div className="col-sm-12">
        {props.data?.controls?.map(item => {
          return (<div key={item.id} className="mb-3 form-check form-check-inline">
            <label className="form-check-label">
              <Field type="radio" name="picked" value={item.label} className="form-check-input" onClick={() => {
                if ((item.subcontrol != null) && item.subcontrol.length > 0) {
                  console.log('add sub Controls', item.subcontrol);
                  dispatch({ type: 'addControls', payload: { controls: item.subcontrol, level: 2 } })
                }
              }} />
                {item.label}
            </label>
            </div>
          )
        })}
</div>
</div>
{ (controlState.level > 1 && controlState.controls[controlState.level][0].inputType === 'text') &&
  <div className="mb-3">
<label htmlFor={controlState.controls[controlState.level][0].name} className="form-label">{controlState.controls[controlState.level][0].label}</label>
            <Field id={controlState.controls[controlState.level][0].id} name={controlState.controls[controlState.level][0].name} placeholder="" className="form-control" />
</div>
}
{ (controlState.level > 1 && controlState.controls[controlState.level][0].inputType === 'radio') &&
  <div className="mb-3">
Draw a new row of buttons
</div>
}
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </Formik>
    </>
  )
}
