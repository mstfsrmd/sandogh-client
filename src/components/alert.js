import React, {useState, useEffect} from 'react';
import {
  Link,
} from 'react-router-dom';
import Notif from './notif.js'
import io from 'socket.io-client';
import host from '../constants/host'
const socket = io.connect(host,{transports: ['websocket']});


const Alert = ({username, manager}) => {
  document.title = 'اعلان ها';
  const [forPublic, setForPublic] = useState([])
  const [forManager, setForManager] = useState([])
  const [forPrivate, setForPrivate] = useState([])
  const [controller, setController] = useState([])

  useEffect(() => {
    socket.emit('giveMeAlert', {username, manager})
  })

  useEffect(() => {
    console.log('bug');
    socket.on('alert', function (n) {
      //setForPublic(n['all'].map((item) => (<div>salam</div>)))
      setForManager(n['manager'].map((item) => (<Notif
        key={item.body}
        title={item.title}
        body={item.body}
        path={item.path}
        date={item.date}
        />)))
      //setForPrivate(n[username].map((item) => (<div>my</div>)))
    })
  },[controller])

  return (
    <div dir="rtl">
      {forPublic}
      {forManager}
      {forPrivate}
    </div>
  );
}

export default Alert;
