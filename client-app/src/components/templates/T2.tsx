import { useState } from 'react';
import { TemplateProps } from '../../types/';
import { Formik, Field, Form } from 'formik';

import './template.scss';


export const T2 = (props: TemplateProps) => {
  const [selectValue, setSelectValue] = useState('');
  return (
    <>
      <h2>{props.data?.heading}</h2>
      <h3>
        {props.data?.subhead}
      </h3>
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
              <Field type="radio" name="picked" value={item.label} className="form-check-input" onClick={() => setSelectValue(item.label)} />
                {item.label}
            </label>
            </div>
          )
        })}
        {selectValue !== '' && <div className="row mb-3">
    <label htmlFor="make" className="col-sm-3 col-form-label T2__label">{`${selectValue} Make`}</label>
    <div className="col-sm-9">
      <Field type="text" className="form-control" name="make" id="make" />
    </div>
  </div>}
</div>
</div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </Formik>
    </>
  )
}
