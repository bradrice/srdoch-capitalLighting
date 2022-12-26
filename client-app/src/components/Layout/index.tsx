import { PropsWithChildren } from 'react';
import { Button } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import './styles.scss';
import logo from '../../img/logo-capitollight-mobile.png';

export const Layout = ({ children }: PropsWithChildren) => {
  const currentPath = useLocation();
  return (
        <div className="Layout__wrapper">
            <div className="Layout__page-header">
                <Link to="/"><img src={logo} alt="Capital Lightign logo" /></Link>
                {currentPath.pathname !== '/'
                  ? (
                        <Button size="sm" color="primary" className="Layout__save-button">Save Progress</Button>
                    )
                  : (
                      ''
                    )}
            </div>
            <div className="page-content container">{children}</div>
        </div>
  );
};
