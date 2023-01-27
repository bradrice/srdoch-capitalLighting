import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './styles.scss';
import { getLocations, setLocation, getAuditTypes, getAllProgress } from '../../api'
import { iSavedLocation, iSavedAudit, iAuditType } from '../../types';
import { setSiteLocation, initializeProgress, setProgressId, setPageId, setInitialRow, setIsSaved } from '../../store/progress';
import { initializeRows } from '../../store/rowcontrol';

export interface AuditCardProps {
  title: string;
  id: string;
  typeId: string;
  location: string;
  initialRow: string;
}

export const AuditCard = (props: AuditCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auditId = useAppSelector(state => state.progress.auditId);
  const [locationItems, setlocationItems] = useState<iSavedLocation[]>([]);
  const [progressItems, setProgressItems] = useState<iSavedAudit[]>([]);
  const [progressSelect, setProgressSelect] = useState<string>('');

  const setNewLocation = async (id: number) => {
    const newId = id + 1;
    dispatch(setProgressId(`${auditId}-${newId}-1`));
    const senddata = { id: newId, typeId: props.typeId, location: props.location, auditId: '22', progressId: `${auditId}-${newId}-1` }
    console.log(senddata);
    dispatch(setSiteLocation({ id: newId, typeId: props.typeId, location: props.location, auditId: '22' }))
    console.log(`${auditId}-${id}-1`)
    dispatch(setProgressId(`${auditId}-${newId}-1`))
    dispatch(setPageId('1'))
    const locationdata = await setLocation(senddata);
    return locationdata;
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    const locations = getLocations();
    const pageId = event.currentTarget.id;
    void locations.then((data) => {
      const locationids = data.map(item => item.id);
      const maxid = (locationids !== null && locationids.length > 0) ? Math.max(...locationids) : 0;
      setNewLocation(maxid).then(data => {
        // dispatch(setProgressId(`${auditId}-${props.id}-1`));
      }).catch(err => console.error('no maxid', err))
    }).then(() => {
      navigate(`${pageId}/1`);
    }).catch(err => console.error('couldn\'t generate an id', err))
  }

  function handleClickNew(event: MouseEvent<HTMLButtonElement>): void {
    console.log('initialize');
    dispatch(initializeProgress());
    dispatch(initializeRows());
    dispatch(setInitialRow(props.initialRow));
    const locations = getLocations();
    const pageId = event.currentTarget.id;
    void locations.then((data) => {
      const locationids = data.map(item => item.id);
      const maxid = (locationids !== null && locationids.length > 0) ? Math.max(...locationids) : 0;
      setNewLocation(maxid).then(data => {
      }).catch(err => console.error('no maxid', err))
    }).then(() => {
      navigate(`${pageId}/1`);
    }).catch(err => console.error('couldn\'t generate an id', err))
  }

  const handleChange = (event: SelectChangeEvent) => {
    console.log('change', event.target.value);
    setProgressSelect(event.target.value);
    dispatch(setProgressId(event.target.value));
    dispatch(setIsSaved(true))
    navigate(`${props.id}/1`);
  }

  useEffect(() => {
    const locations = getLocations();
    const progress = getAllProgress();
    progress.then((data) => {
      setProgressItems(data);
    }).catch((err) => console.log('no saved progress', err))
    locations.then((data) => {
      setlocationItems(data);
    }).catch((err) => console.log('no saved locations', err))
  })

  return (
    <Card>
      <CardBody>
        <Button
          id={props.id?.toString()}
          onClick={(e) => handleClick(e)}
          className="AuditCard__button"
          color="primary"
        >
          {props.title}
        </Button>
        {
          progressItems !== null && progressItems.length > 0 && props.id === '5' &&
        <FormControl fullWidth>
              <InputLabel id="saved-location-label">Continue with Saved Interior Fixture</InputLabel>
        <Select
          labelId="saved-locaton"
          id="saved-location-id"
          value={progressSelect}
          label="Continue with Saved Interior Fixture"
          onChange={handleChange}
        >
          { progressItems.map((item) => {
            return <MenuItem key={item.progressId} value={item.progressId}>{item.progressId}</MenuItem>
          }) }
                  </Select>
      </FormControl>
}
        {/* <Button
          id={props.id?.toString()}
          onClick={(e) => handleClick(e)}
          className="AuditCard__button"
          color="primary"
        >
          Continue saved {props.title}
        </Button> */}
        {props.id !== '5' &&
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Not Started
        </CardSubtitle>
}
      </CardBody>
    </Card>
  );
};
