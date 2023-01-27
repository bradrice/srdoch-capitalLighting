import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import { T1 } from '../templates/T1';
import { T2 } from '../templates/T2';
import { T3 } from '../templates/T3';
import { T9 } from '../templates/T9';
import { NotFound } from '../templates/NotFound';
import { getAuditTypeById } from '../../api';

import { iAuditType, Template } from '../../types';
import { useAppSelector } from '../../hooks';

export interface MyParams {
  id: string;
}

export const AuditLocation = () => {
  const { id } = useParams<keyof MyParams>() as MyParams;
  const [templateData, setTemplateData] = useState<iAuditType | undefined>();
  const auditId = useAppSelector(state => state.progress.auditId);

  useEffect(() => {
    console.log(id);
    getAuditTypeById(id).then((data) => {
      console.log(data);
      setTemplateData(data[0]);
    }).catch((err) => console.log('cannot get templatedata', err));
  }, [id]);
  // useEffect(() => {
  //   console.log(`/data/${id}.json`);
  //   const fetchId = async (): Promise<void> => {
  //     try {
  //       fetch(`/data/${id}.json`)
  //         .then(async res => await res.json())
  //         .then(data => {
  //           console.log(data);
  //           setTemplateData(data);
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //           const error = new Error(err.message)
  //           throw error;
  //         })
  //     } catch (error) {
  //       // You can create an error state and set error here
  //       console.log(error);
  //     }
  //   }
  // void fetchId();

  //   return () => {
  //     // Do some cleanup
  //   }
  // }, []);

  function renderSwitch(param: string) {
    console.log(param);
    switch (param) {
      case 'T1':
        return <T1 auditId={auditId} />;
      case 'T2':
        return <T2 auditId={auditId} />
      case 'T3':
        return <T3 auditId={auditId} />
      case 'T9':
        return <T9 auditId={auditId} />
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
