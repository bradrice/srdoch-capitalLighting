import { PropsWithChildren } from 'react';
import { Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import './styles.scss';
import logo from '../../img/logo-capitollight-mobile.png';

export const Layout = ({ children }: PropsWithChildren) => {
  const currentPath = useLocation();
  console.log(currentPath.pathname);
  return (
        <div className="Layout__wrapper">
            <div className="Layout__page-header">
                <img src={logo} alt="Capital Lightign logo" />
                {currentPath.pathname !== '/'
                  ? (
                        <Button className="Layout__save-button">Save Progress</Button>
                    )
                  : (
                      ''
                    )}
            </div>
            <div className="page-content">{children}</div>
        </div>
  );
};
