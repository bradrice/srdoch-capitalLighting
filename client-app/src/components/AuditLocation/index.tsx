import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import { T1 } from '../templates/T1';
import { T2 } from '../templates/T2';
import { T3 } from '../templates/T3';
import { T9 } from '../templates/T9';
import { NotFound } from '../templates/NotFound';

import { Template } from '../../types';

export interface MyParams {
  id: string;
}

export const AuditLocation = () => {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const [templateData, setTemplateData] = useState<Template | undefined>();

  useEffect(() => {
    console.log(`/data/${id}.json`);
    fetch(`/data/${id}.json`)
      .then(async res => await res.json())
      .then(data => {
        console.log(data);
        setTemplateData(data);
      })
      .catch((err) => {
        console.log(err.message);
        const error = new Error(err.message)
        throw error;
      })
  }, []);

  function renderSwitch(param: string) {
    switch (param) {
      case 'T1':
        return <T1 data={templateData} />;
      case 'T2':
        return <T2 data={templateData} />
      case 'T3':
        return <T3 data={templateData} />
      case 'T9':
        return <T9 data={templateData} />
      default:
        return <NotFound />;
    }
  }


  return (
    <Layout>
      <h1>Site Audit</h1>
      {(templateData != null) ? renderSwitch(templateData.template) : renderSwitch('notFound')}
    </Layout>
  );
};
