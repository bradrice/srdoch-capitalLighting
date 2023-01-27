import { MouseEvent, PropsWithChildren, useState } from 'react';
import { Button } from 'reactstrap';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles.scss';
import logo from '../../img/logo-capitollight-mobile.png';
// import handleSubmit from '../../handles/handleSubmit';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks';
import { setAuditId, initializeProgress } from '../../store/progress';
import { setRowDoc } from '../../api';
import { initializeRows } from '../../store/rowcontrol';
// import { getControlsByRow } from '../../api';

interface ComponentProps {
  pageId?: string;
}

export const Layout = (props: PropsWithChildren<ComponentProps>) => {
  const currentPath = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const controlData = useAppSelector(state => state.rowcontrol);
  const auditId = useAppSelector(state => state.progress.auditId);
  const siteLocation = useAppSelector(state => state.progress.siteLocation);
  const progressId = useAppSelector(state => state.progress.progressId);
  const pageId = props.pageId !== undefined ? props.pageId : '1';
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSaving(true);
    console.log('send data to firestore', controlData, auditId, props.pageId);
    const controlOrder: string[] = [];
    controlData.forEach(control => {
      if (control !== null) {
        controlOrder.push(control.rowid);
      }
    })
    const savedControlMap = new Map();
    const savedValueMap = new Map();
    controlData.forEach((controlrow) => {
      console.log(controlrow);
      if (controlrow === null) return;
      controlrow.control.forEach((control) => {
        if (control !== null && (control.selected === true || control.inputType === 'text')) {
          savedControlMap.set(controlrow.rowid, control.id);
        }
        if (control !== null && (control.value !== '' || control.value !== undefined)) {
          if (control.inputType === 'text' || control.selected === true) {
            savedValueMap.set(control.id, control.value)
          }
        }
      })
    });
    const savedControlObj = Object.fromEntries(savedControlMap);
    const savedValueObj = Object.fromEntries(savedValueMap);
    console.log({ progressId, pageId, controlOrder, selectControls: savedControlObj, savedControlValues: savedValueObj })
    void setRowDoc({ progressId, pageId, controlOrder, selectControls: savedControlObj, savedControlValues: savedValueObj })
      .then(() => {
        setIsSaving(false);
      })
  }
  const goHome = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate('/');
    dispatch(initializeRows());
    dispatch(initializeProgress());
  }
  return (
        <div className="Layout__wrapper">
            <div className="Layout__page-header">
        <Box sx={{ display: 'flex' }} onClick={(e) => { void goHome(e) }}>
                <img src={logo} alt="Capital Lighting logo"/>
              </Box>
                {siteLocation?.id !== null &&
                <Box sx={{ display: 'flex' }}>
                Audit {auditId} - {progressId}
                  </Box>
                }
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
