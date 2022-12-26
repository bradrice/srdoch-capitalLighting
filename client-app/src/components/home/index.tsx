import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';

import './styles.scss';

export const Home = (): JSX.Element => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/audit');
  }

  return (
    <Layout>
      <div className="container">
        <h1>Site Audit</h1>
        <div>
          <h2>Audit Introduction</h2>
          <hr />
          <p>
            Welcome to the Capitol Light Site Audit System. Please fill in the
            information below and press 'Continue' to proceed to the Audit
            Dashboard
          </p>
          <div className="row">
            <div className="col-6">
              <p>Audit Number: 21</p>
              <p>Capitol Light Contact Name: CSR(nccsr)</p>
              <p>Location: DSG 30</p>
              <p>Address 1: </p>
              <p>City: ERIE</p>
            </div>
            <div className="col-6">
              <p>Audit Date: 5/16/2022</p>

              <p>Capitol Light Contact Number: 1-800-329-8643</p>

              <p>Building/Mall Name: </p>

              <p>Address 2: </p>

              <p>State: PA</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button color="primary" onClick={handleClick}>Start Audit</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
