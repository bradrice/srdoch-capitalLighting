import { useParams } from 'react-router-dom';
import { Layout } from '../Layout';

export const AuditLocation = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div>Audit Location {id}</div>
    </Layout>
  );
};
