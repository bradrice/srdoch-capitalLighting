import { MouseEvent, PropsWithChildren, useState } from 'react';
import { Button } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles.scss';
import logo from '../../img/logo-capitollight-mobile.png';
// import handleSubmit from '../../handles/handleSubmit';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setAuditId } from '../../store/progress';
import { setRowDoc } from '../../api';
// import { getControlsByRow } from '../../api';

interface ComponentProps {
  pageId?: string;
}

export const Layout = (props: PropsWithChildren<ComponentProps>) => {
  const currentPath = useLocation();
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const controlData = useAppSelector(state => state.rowcontrol);
  const auditId = useAppSelector(state => state.progress.auditId);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSaving(true);
    console.log('send data to firestore', controlData, auditId, props.pageId);
    const controlOrder = controlData.map(control => {
      return control.rowid;
    })
    const savedControlMap = new Map();
    controlData.forEach((controlrow) => {
      controlrow.control.forEach((control) => {
        if (control.selected === true) {
          savedControlMap.set(controlrow.rowid, control.id);
        }
      })
    });
    const savedControlObj = Object.fromEntries(savedControlMap);
    console.log({ auditId: '22', pageId: 'interiorother', controlOrder, selectControls: savedControlObj })
    void setRowDoc({auditId: '', pageId: 'interiorother', controlOrder, selectControls: savedControlObj})
      .then(() => {
        setIsSaving(false);
      })
    dispatch(setAuditId(''));
  }
  return (
        <div className="Layout__wrapper">
            <div className="Layout__page-header">
                <Link to="/"><img src={logo} alt="Capital Lightign logo"/></Link>
                {currentPath.pathname !== '/'
                  ? (
            <Box sx={{ display: 'flex' }}>
              <Button size="sm" color="primary" className="Layout__save-button" onClick={handleClick} >Save Progress</Button>
              {isSaving && <CircularProgress />}
            </Box>
                    )
                  : (
                      ''
                    )}
            </div>
            <div className="Layout__page-content container">{props.children}</div>
        </div>
  );
};
