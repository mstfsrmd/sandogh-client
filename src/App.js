import React, {useState, useEffect} from 'react';
import  writeFileP from "write-file-p";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Footer from './components/main-footer';
import NotFound from './components/404';
import UnderStr from './components/underStrc';
import Manager from './components/manager';



const App = () => {
  const[registered, setRegistered] = useState(false);
  const[manager, setManager] = useState(false);

  const isVerified = (e) => {
    if (e) {
      setRegistered(true)
    }
  }

  const isManager = (e) => {
    if (e) {
      setManager(true)
      localStorage.setItem('i', true)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('i')) {
      setManager(true)
    }
  }, [registered, manager])

  return (
    <Router>
      <Switch>
        <Route path={'/'} exact>
          <Header />
          <Login isVerified={isVerified} isManager={isManager} />
          <Footer />
          {(registered === true) ? <Redirect to={'/من'} /> : <Redirect to={'/'} />}
          {(manager === true) ? <Redirect to={'/manager'} /> : <Redirect to={'/'} />}
        </Route>
        <Route path={'/ورود'}>
          <Header />
          <Login isVerified={isVerified} isManager={isManager}/>
          <Footer />
          {(registered === true) ? <Redirect to={'/من'} /> : <Redirect to={'/ورود'} />}
          {(manager === true) ? <Redirect to={'/manager'} /> : <Redirect to={'/ورود'} />}
        </Route>
        <Route path={'/ثبت'}>
          <Header />
          <Register isVerified={isVerified}/>
          <Footer />
          {(registered === true) ? <Redirect to={'/من'} /> : <Redirect to={'/ثبت'} />}
        </Route>
        <Route path={'/من'}>
          {(registered === true) ? <Header /> : <Redirect to={'/ورود'} />}
        </Route>
        <Route path={'/manager'}>
            {(manager === true) ? <Manager /> : <Redirect to={'/ورود'} />}
        </Route>
        <Route path={'/راهنما'}>
            <UnderStr />
        </Route>
        <Route path={'/خصوصی'}>
            <UnderStr />
        </Route>
        <Route path={'/شرایط'}>
            <UnderStr />
        </Route>
        <Route path={'*'}>
            <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
