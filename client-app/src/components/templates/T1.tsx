import { Formik, Field, Form, FormikHelpers } from 'formik';

import { TemplateProps } from '../../types/';



export const T1 = (props: TemplateProps) => {
  interface Values {
    sfrearleft: string;
    sfrearcenter: string;
    sfrearright: string;
    sfmiddleleft: string;
    sfmiddlecenter: string;
    sfmiddleright: string;
    sffrontleft: string;
    sffrontcenter: string;
    sffrontright: string;
  }
  return (
        <Formik
    initialValues={{
      sfrearleft: '',
      sfrearcenter: '',
      sfrearright: '',
      sfmiddleleft: '',
      sfmiddlecenter: '',
      sfmiddleright: '',
      sffrontleft: '',
      sffrontcenter: '',
      sffrontright: ''
    }}
      onSubmit={(
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
      <div className="row">
        {props.data?.controls?.map(item => {
          return (<div key={item.label} className="col-sm-4">
            <div className="mb-3">
<label htmlFor={item.name} className="form-label">{item.label}</label>
            <Field id={item.id} name={item.name} placeholder="" className="form-control" />
</div>
            </div>
          )
        })}
</div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </Formik>
  )
}
