import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import './styles.scss';
import { getLocations, setLocation } from '../../api'
import { iSavedLocation } from '../../types';
import { setSiteLocation } from '../../store/progress';

export interface AuditCardProps {
  title: string;
  id: string;
  typeId: string;
  location: string;
}

export const AuditCard = (props: AuditCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const setNewLocation = async (id: number) => {
    const newId = id + 1;
    const senddata = { id: newId, typeId: props.typeId, location: props.location, auditId: '22' }
    console.log(senddata);
    dispatch(setSiteLocation({ id: newId, typeId: props.typeId, location: props.location, auditId: '22' }))
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
      }).catch(err => console.error('no maxid', err))
    }).then(() => {
      navigate(pageId);
    }).catch(err => console.error('couldn\'t generate an id', err))
  }

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
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Not Started
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};
