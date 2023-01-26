import { MouseEvent, PropsWithChildren, useState } from 'react';
import { Button } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './styles.scss';
import logo from '../../img/logo-capitollight-mobile.png';
// import handleSubmit from '../../handles/handleSubmit';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks';
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
  const siteLocation = useAppSelector(state => state.progress.siteLocation);
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
    console.log({ auditId: '22', pageId: 'interiorother', controlOrder, selectControls: savedControlObj, savedControlValues: savedValueObj })
    void setRowDoc({ auditId: '22', pageId: 'interiorother', controlOrder, selectControls: savedControlObj, savedControlValues: savedValueObj })
      .then(() => {
        setIsSaving(false);
      })
    dispatch(setAuditId('22'));
  }
  return (
        <div className="Layout__wrapper">
            <div className="Layout__page-header">
              <Box sx={{ display: 'flex' }}>
                <Link to="/"><img src={logo} alt="Capital Lightign logo"/></Link>
              </Box>
                {siteLocation?.id !== null &&
                <Box sx={{ display: 'flex' }}>
                Audit {auditId} - { siteLocation?.typeId }:{siteLocation?.id}
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
