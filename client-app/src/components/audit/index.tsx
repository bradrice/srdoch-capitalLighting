import { AuditCard } from '../AuditCard';
import { Button } from 'reactstrap';
import locationData from '../../data/locationData.json';
import { Layout } from '../Layout';

import './styles.scss';

export const Audit = (): JSX.Element => {
  return (
    <Layout>
      <div className="container-fluid">
        <h1>Site Audit</h1>
        <p>
          Welcome to the Capitol Light Site Audit System. Please visit the
          ‘Documentation and Instructions’ section for more information on using
          this system and performing a site audit for Capitol Light. The button
          color coding is designed to direct you during the audit: red for areas
          not started, yellow for areas started but not marked complete, and
          green for completed areas. You can review entered fixtures at any time
          by clicking on the ‘View/Edit Entries’ button. If you have any
          questions please email audithelp@capitollight.com or call
          1-800-867-5309.
        </p>
        <div className="row">
          <div className="col-6">
            <Button color="primary">Documentation</Button>
          </div>
          <div className="col-6">
            <Button color="primary">Survey Information</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="Audit__cardgroup">
              <h2 className="Audit__cardgroup-title">
                Overall Interior Information
              </h2>
            </div>
            <div className="row">
              {locationData.location.length > 0 &&
                locationData.location.map((item) => {
                  console.log(item);
                  return (
                    <div className="col-sm-3" key={item.id} data-id={item.id}>
                      <AuditCard title={item.title} id={item.id} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
