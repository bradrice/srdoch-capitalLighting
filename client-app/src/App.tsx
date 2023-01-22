import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { APP_ROOT, PERFORM_AUDIT } from './routes';

import { Home } from './components/home';
import { Audit } from './components/audit';
import { AuditLocation } from './components/AuditLocation';
import { InteriorOther } from './components/InteriorOther';
import { useAppSelector } from './hooks';
import './App.css';

const App = (): JSX.Element => {
  const auditId = useAppSelector(state => state.progress.auditId);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={PERFORM_AUDIT} element={<Audit />} />
          <Route path={`${APP_ROOT}/*`} element={<Home />} />
          <Route path="/audit/:id" element={<AuditLocation />} />
          <Route path="/audit/interiorother" element={<InteriorOther auditId={auditId} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
