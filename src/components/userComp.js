import React, {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Switch,
  Router,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import PaymentIcon from '@material-ui/icons/Payment';
import MoneyIcon from '@material-ui/icons/Money';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import {PathLine} from 'react-svg-pathline'
import UnderStr from './underStrc';
import Section from './manager-sec';
import io from 'socket.io-client';
import host from '../constants/host'
import Graph from './graph.js'
import UserProfile from './userProfile.js'

const UserComp = ({getFin, ncode, name, username, verified, email, activity, manager, money, debt}) => {
  const[v, setV] = useState('')
  const[m, setM] = useState('')
  const[i, setI] = useState('')
  const[u, setU] = useState("@"+username)
  const[d, setD] = useState(debt+" قسط")


  useEffect(() => {
    if (typeof username == 'number') {
      setU('')
    }
    if (!debt) {
      setD(0+" قسط")
    }
    if (verified) {
      if (manager) {
        setV(<VerifiedUserRoundedIcon className="userContIcon" style={{color:'#7CBB00', fontSize:30}} />)
        setI('مدیر')
      }else {
        if (verified === true) {
          setV(<VerifiedUserRoundedIcon className="userContIcon" style={{color:'#00A1F1', fontSize:30}} />)
          setI('تایید شده')
        }else if (verified.ncode && verified.name) {
          setV(<ReportRoundedIcon className="userContIcon" style={{color:'#FFBB00', fontSize:30}} />)
          setI('در انتظار تایید')
        }else {
          setV(<ReportRoundedIcon className="userContIcon" style={{color:'#FFBB00', fontSize:30}} />)
          setI('در انتظار تایید')
        }
      }
    }else {
      setV(<ReportRoundedIcon className="noVerified userContIcon" style={{color:'#F65314', fontSize:30}}/>)
      setI('تایید نشده')
    }
  },[1])

  return (
    <Link
    className='userCont'
    dir="rtl"
    to={"/manager/users/"+u.replace('@', '')}
    onClick={()=>{
      getFin(name, username, ncode)
    }}
    >
      <div className="userContR">
        <h1>{name}</h1>
        <p dir="ltr">{u}</p>
        <Graph activity={activity} />
      </div>
      <div className="userContL">
        <div className="userContInfo">
          <p className="userContChip">
            <span className="userContChipP">{d}</span>
            <PaymentIcon style={{borderRight:'solid #999 1px', paddingRight: 5, fontSize:30}}/>
          </p>
        </div>
        <div className="userContIconCont">
           <p className={"userContIconi"} style={{padding:"0 0 0 10px"}}>{i}</p>
         {v}
        </div>
      </div>
    </Link>
  );
}
export default UserComp;
