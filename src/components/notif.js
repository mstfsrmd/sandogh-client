import React, {useState, useEffect} from 'react';
import {
  Link,
} from 'react-router-dom';
import io from 'socket.io-client';
import host from '../constants/host'
const socket = io.connect(host,{transports: ['websocket']});


const Notif = ({title, body, path, date}) => {
  document.title = 'صندوق یار - اعلان ها';
  const [forPublic, setForPublic] = useState([])
  const [forManager, setForManager] = useState([])
  const [forPrivate, setForPrivate] = useState([])
  const [controller, setController] = useState([])


  return (
    <div className="notifCont" dir="rtl">
      <h1 className="notifHed">{title}</h1>
      <p className="notifBody">{body}</p>
      <Link to={path} style={{
        textDecoration: 'none',
        alignSelf:'center',
        color: '#00A1F1',
      }}>
        <p className="notifGoto">بررسی</p>
      </Link>
      <p className="notifDate">{date}</p>
    </div>
  );
}

export default Notif;
