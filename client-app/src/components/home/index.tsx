import { useState, ChangeEvent, SyntheticEvent } from 'react';
import { Button } from 'reactstrap';
import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Layout } from '../Layout';
import { useAppDispatch } from '../../hooks';
import { setAuditId } from '../../store/progress';
import './styles.scss';

export const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const auditId = useAppSelector(state => state.progress.auditId);
  const [auditDate, setAuditDate] = useState<Dayjs | null>(
    dayjs()
  );
  const [auditNumber, setAuditNumber] = useState('22');

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      auditnumber: HTMLInputElement;
    }
    dispatch(setAuditId(formElements.auditnumber.value));
    console.log(formElements.auditnumber.value, dayjs(auditDate).format('MM/DD/YYYY'));
    navigate('/audit');
  }

  const handleChange = (newValue: Dayjs | null) => {
    setAuditDate(newValue);
  };

  const handleAuditNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAuditNumber(e.currentTarget.value);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
                <div>Audit Number: <Input type="text" name='auditnumber' id='auditnumber' value={auditNumber} disabled /></div>
              <p>Capitol Light Contact Name: CSR(nccsr)</p>
              <p>Location: DSG 30</p>
              <p>Address 1: </p>
              <p>City: ERIE</p>
            </div>
            <div className="col-6">
                  <div><label>Audit Date:</label>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={auditDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  </div>

              <p>Capitol Light Contact Number: 1-800-329-8643</p>

              <p>Building/Mall Name: </p>

              <p>Address 2: </p>

              <p>State: PA</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button color="primary" type="submit">Start Audit</Button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </Layout>
    </LocalizationProvider>
  );
}
