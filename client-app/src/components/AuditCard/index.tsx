import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle } from 'reactstrap';
import './styles.scss';

export interface AuditCardProps {
  title: string;
  id?: number;
}

export const AuditCard = (props: AuditCardProps) => {
  const navigate = useNavigate();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    navigate(`${event.currentTarget.id}`);
  }

  return (
    <Card>
      <CardBody>
        <Button
          id={props.id?.toString()}
          onClick={handleClick}
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
