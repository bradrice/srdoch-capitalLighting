import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import locationData from '../../data/locationData.json';
import { T1 } from '../templates/T1';
import { T2 } from '../templates/T2';
import { T3 } from '../templates/T3';
import { NotFound } from '../templates/NotFound';

import { Template } from '../../types';

export interface MyParams {
  id: string;
}

export const AuditLocation = () => {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const [templateData, setTemplateData] = useState<Template | undefined>();

  useEffect(() => {
    if (locationData.locationControls.length > 0) {
      setTemplateData(locationData?.locationControls.find(element => element.id === id));
    }
  });

  function renderSwitch(param: string) {
    switch (param) {
      case 'T1':
        return <T1 data={templateData} />;
      case 'T2':
        return <T2 data={templateData} />
      case 'T3':
        return <T3 data={templateData} />
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
