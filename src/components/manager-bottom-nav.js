import React, {useState, useEffect} from 'react';
import {
  Link,
} from 'react-router-dom';
import Add from './add';
import PopUp from './popUp.js';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


const BottomNav = ({haveAlert, path, addUserInfo,sentToServer}) => {
  const [alert, setAlert] = useState('');
  const [alertCircle, setAlertCircle] = useState('');

  useEffect(() => {
    if (!haveAlert) {
      setAlert(
        <NotificationsIcon
          className="mngr-bottom-nav-alert"
          style={{fontSize:40, color:'#aaa'}}
        />
      )
      setAlertCircle(
        <PopUp />
      )
    }else {
      setAlert(
        <NotificationsNoneIcon
          className="mngr-bottom-nav-alert"
          style={{fontSize:40, color:'#999'}}
        />)
    }
  },[1])

  return (
    <div className="mngr-bottom-nav" dir="rtl">
      <Add path={path} addUserInfo={addUserInfo} sentToServer={sentToServer}/>
      <Link to={"/manager/alert"}>
        {alert}
        {alertCircle}
      </Link>
    </div>
  );
}

export default BottomNav;
