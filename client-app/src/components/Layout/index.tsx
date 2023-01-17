import { PropsWithChildren, MouseEvent } from 'react';
import { Button } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import './styles.scss';
import logo from '../../img/logo-capitollight-mobile.png';
import handleSubmit from '../../handles/handleSubmit';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setRowControls } from '../../store/progress';

export const Layout = ({ children }: PropsWithChildren) => {
  const currentPath = useLocation();
  const dispatch = useAppDispatch();
  const controlData = useAppSelector(state => state.rowcontrol);
  const auditId = useAppSelector(state => state.progress.auditId);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSubmit('some new data').then(() => {
      console.log('saved data', controlData, auditId);
      dispatch(setRowControls(controlData))
      alert(JSON.stringify(controlData));
    }).catch(e => console.error(e));
  }
  return (
        <div className="Layout__wrapper">
            <div className="Layout__page-header">
                <Link to="/"><img src={logo} alt="Capital Lightign logo"/></Link>
                {currentPath.pathname !== '/'
                  ? (
            <Button size="sm" color="primary" className="Layout__save-button" onClick={handleClick} >Save Progress</Button>
                    )
                  : (
                      ''
                    )}
            </div>
            <div className="Layout__page-content container">{children}</div>
        </div>
  );
};
