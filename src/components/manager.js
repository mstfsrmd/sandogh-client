import React from 'react';
import Logo from './logo'
import BottomNav from './manager-bottom-nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Main from './main-cont';

const Manager = () => {
  return (
    <Router>
      <Link to={'/manager'} className="header-mngr" dir="rtl">
        <Logo />
      </Link>
      <Main />
      <BottomNav />
    </Router>
  );
}

export default Manager;
