import React, {useState, useEffect} from 'react';
import {
  BrowserRouter ,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import Footer from './components/main-footer';
import NotFound from './components/404';
import UnderStr from './components/underStrc';
import Manager from './components/manager';
import ConnectionError from './components/connectionError'
import io from 'socket.io-client';
import host from './constants/host'
const socket = io.connect(host,{transports: ['websocket']});

const App = () => {
  const[isUser, setIsUser] = useState(false);
  const[manager, setManager] = useState(false);
  const[logedInUser, setLogedInUser] = useState('');
  const[error, setError] = useState(false);

  const isVerified = (e) => {
    if (e) {
      setIsUser(true)
    }else {
      setIsUser(false)
    }
  }

  const setErrorF = (e) => {
    if (e) {
      setError(<Redirect to={'/error'} />)
    }else {
      setError(false)
    }
  }

  const isManager = (e) => {
    if (e) {
      setManager(true)
      localStorage.setItem('manager', true)
    }
  }

  const logedInUserF = (e) => {
    setLogedInUser(e)
    localStorage.setItem('username', e)
  }

  useEffect(() => {
    if (localStorage.getItem('manager')) {
      setManager(true)
    }
  })

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setIsUser(true)
      setLogedInUser(localStorage.getItem('username'))
    }
  })

  useEffect(() => {
    let username = localStorage.getItem('username');
    socket.emit('activity', username)
  }, [1])

  setTimeout(() => {
    if (!socket.connected) {
      setError(<Redirect to={'/error'} />)
    }else {
      setError(false)
    }
  }, 1000);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact>
          <Header />
          <Login isVerified={isVerified} isManager={isManager} logedInUserF={logedInUserF} setErrorF={setErrorF}/>
          <Footer />
          {(isUser === true) ? <Redirect to={'/me'} /> : <Redirect to={'/'} />}
          {(manager === true) ? <Redirect to={'/manager'} /> : <Redirect to={'/'} />}
          {(error === false) ? <Redirect to={'/'} /> : <Redirect to={'/error'} />}
        </Route>
        <Route path={'/login'}>
          <Header />
          <Login isVerified={isVerified} isManager={isManager} logedInUserF={logedInUserF} setErrorF={setErrorF}/>
          <Footer />
          {(isUser === true) ? <Redirect to={'/me'} /> : <Redirect to={'/login'} />}
          {(manager === true) ? <Redirect to={'/manager'} /> : <Redirect to={'/login'} />}
          {(error === false) ? <Redirect to={'/login'} /> : <Redirect to={'/error'} />}
        </Route>
        <Route path={'/register'}>
          <Header />
          <Register isVerified={isVerified}/>
          <Footer />
          {(isUser === true) ? <Redirect to={'/me'} /> : <Redirect to={'/register'} />}
          {(manager === true) ? <Redirect to={'/manager'} /> : <Redirect to={'/login'} />}
          {(error === false) ? <Redirect to={'/register'} /> : <Redirect to={'/error'} />}
        </Route>
        <Route path={'/me'}>
          {(manager === true && isUser === true) ? <Redirect to={'/manager'} />
          :(isUser === true && manager != true) ? <Header logedInUser={logedInUser} manager={manager} />
          : <Redirect to={'/login'} />}
          {(error === false) ? <Redirect to={'/me'} /> : <Redirect to={'/error'} />}
        </Route>
        <Route path={'/manager'}>
            {(manager === true && isUser === true) ? <Manager manager={manager} logedInUser={logedInUser} />
            :(isUser === true && manager != true) ? <Redirect to={'/me'} />
            : <Redirect to={'/login'} />}
            {(error === false) ? <Redirect to={'/manager'} /> : <Redirect to={'/error'} />}
        </Route>
        <Route path={'/help'}>
            <UnderStr />
        </Route>
        <Route path={'/privacy'}>
            <UnderStr />
        </Route>
        <Route path={'/terms'}>
            <UnderStr />
        </Route>
        <Route path={'/error'}>
            {(error === false) ? <Redirect to={'/'} /> : <ConnectionError /> }
        </Route>
        <Route path={'/ثبت'}>
            <Redirect to={'/register'} />
        </Route>
        <Route path={'/ورود'}>
            <Redirect to={'/login'} />
        </Route>
        <Route path={'/من'}>
            <Redirect to={'/me'} />
        </Route>
        <Route path={'*'}>
            <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
