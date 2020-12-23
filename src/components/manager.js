import React, {useState, useEffect} from 'react';
import Logo from './logo'
import BottomNav from './manager-bottom-nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Main from './main-cont';
import GoBack from './back';

const Manager = ({logedInUser, manager}) => {
  document.title = 'مدیریت';
  const [path, setPath] = useState('/manager/add')
  const [backIcon, setBackIcon] = useState(false)
  const [addUserInfo, setAddUserInfo] = useState('')
  const [infoSentToServer, setInfoSentToServer] = useState('')
  
  console.log(logedInUser);

  const changePath = (e) => {
    setPath(e);
  }

  const addUserInfoF = (e) => {
    setAddUserInfo(e);
  }

  const sentToServer = (e) => {
    setInfoSentToServer(e);
  }

  const changeBackIconPath = (e) => {
      setBackIcon(e)
  }

  useEffect(() => {
    if (infoSentToServer) {
      setAddUserInfo('');
      //console.log(infoSentToServer);
    }
  },[addUserInfoF])

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission()
    }
    /*let notifBody = 'به صندوق یار خوش آمدید!'
    var notif = new Notification('سلام!', {lang:'fa-IR', dir:'rtl', body:notifBody})*/
  },[1])

  return (
    <>
      <Link to={'/manager'} className="header-mngr" dir="rtl">
        <Logo />
        {/* (backIcon) ? <GoBack path={backIcon} /> : ''*/}
      </Link>
      <Main manager={manager} changePath={changePath} addUserInfo={addUserInfoF} logedInUser={logedInUser} changeBackIconPath={changeBackIconPath}/>
      <BottomNav path={path} addUserInfo={addUserInfo} sentToServer={sentToServer}/>
    </>
  );
}

export default Manager;
