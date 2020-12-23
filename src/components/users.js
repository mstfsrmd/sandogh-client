import React, {useState, useEffect} from 'react';
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';
import UnderStr from './underStrc';
import Section from './manager-sec';
import io from 'socket.io-client';
import host from '../constants/host'
import UserComp from './userComp'
import UserProfile from './userProfile.js'
const socket = io.connect(host,{transports: ['websocket']});

const Users = ({changePath, addUserInfo, changeBackIconPath, logedInUser}) => {
  const[user, setUser] = useState('')
  const[profile, setProfile] = useState('')
  const[array, setArray] = useState([])
  const[p, setP] = useState('')

  const getFin = (n, u, c) => {
    socket.emit('giveMeFin', {n, u, c})
  }

  useEffect(()=>{
    changeBackIconPath('/manager')
    socket.emit('giveMeUsers', logedInUser)
  }, [0])

  useEffect(()=>{
    socket.on('users', function (e) {
      setUser(e.map((item,i) => (<UserComp
        key={i}
        name={item.name}
        activity={item.activity}
        username={item.username.toString()}
        verified={item.isUser}
        phone={item.phone.p}
        manager={item.manager}
        money={item.allMoney}
        debt={item.debt}
        ncode={item.ncode}
        getFin={getFin}
        />)));
      setProfile(e.map((item,i) => (
        <Route path={"/manager/users/"+item.username.toString()} >
          <UserProfile
          key={item.username.toString()}
          name={item.name}
          activity={item.activity}
          username={item.username.toString()}
          verified={item.isUser}
          phone={item.phone.p}
          manager={item.manager}
          money={item.allMoney}
          debt={item.debt}
          ncode={item.ncode}
          joinDate={item.joinDate}
          addedBy={item.addedBy}
          addedIn={item.addedIn}
          />
        </Route>)))
    })
  },[array])


  return (
    <div className="addInfo-cont" >
      <Route path={'/manager/users'} exact>
        {user}
      </Route>
      {profile}
    </div>
  );
}
export default Users;
