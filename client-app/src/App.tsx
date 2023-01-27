import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { APP_ROOT, PERFORM_AUDIT } from './routes';

import { Home } from './components/home';
import { Audit } from './components/audit';
import { AuditLocation } from './components/AuditLocation';
import { InteriorOther } from './components/InteriorOther';
import { useAppSelector, useAppDispatch } from './hooks';
import { initializeRows } from './store/rowcontrol';
import { initializeProgress } from './store/progress';
import './App.css';

const App = (): JSX.Element => {
  const auditId = useAppSelector(state => state.progress.auditId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('inital call in app');
    dispatch(initializeRows);
    dispatch(initializeProgress);
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={PERFORM_AUDIT} element={<Audit />} />
          <Route path={`${APP_ROOT}/*`} element={<Home />} />
          <Route path="/audit/:id/:pageId" element={<AuditLocation />} />
          <Route path="/audit/interiorother" element={<InteriorOther auditId={auditId} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
