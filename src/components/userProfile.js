import React, {useState, useEffect} from 'react';
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import Random from './random.js';
import io from 'socket.io-client';
import host from '../constants/host'
const socket = io.connect(host,{transports: ['websocket']});

console.log(socket);

const UserProfile = ({addedBy, addedIn, joinDate, name, username, verified, email, activity, manager, money, debt, ncode, phone}) => {
  const[v, setV] = useState('')
  const[c, setC] = useState('')
  const[m, setM] = useState('')
  const[i, setI] = useState('')
  const[u, setU] = useState("@"+username)
  const[d, setD] = useState(debt+" قسط")
  const[phoneN, setPhoneN] = useState("_")
  const[message, setMessage] = useState("")
  const[iC, setIC] = useState('')
  const[monthly, setMonthly] = useState('')

  useEffect(() => {
    socket.on('usersFin',function (e) {
      console.log(e);
      setMonthly(e.monthly)
    })
  })

  useEffect(()=>{
    if (verified) {
      if (manager) {
        setIC(<VerifiedUserRoundedIcon className="userContIcon" style={{color:'#7CBB00', fontSize:40, marginTop:170}} />)
        setV('#7CBB00')
        setC('#f9fbe7')
        setI('مدیر ')
        setM('مدیر')
      }else {
        if (verified === true) {
          setIC(<VerifiedUserRoundedIcon className="userContIcon" style={{color:'#00A1F1', fontSize:40, marginTop:100}} />)
          setV('#00A1F1')
          setC('#e0f7fa')
          setI('تایید شده ')
          setM('تایید شده ')
          setPhoneN(phone);
          setMessage(<span>هویت این کاربر توسط <Link className={'adder'} to={(addedBy==localStorage.getItem('username'))?("/manager"):("/manager/users/"+addedBy)}>{(addedBy==localStorage.getItem('username'))?("شما"):(addedBy+"@")}</Link> در تاریخ <span dir={"ltr"}>{addedIn}</span> تایید شده است.</span>)
        }else if (verified.ncode && verified.name) {
          setIC(<ReportRoundedIcon className="userContIcon" style={{color:'#FFBB00', fontSize:40}} />)
          setV('#FFBB00')
          setC('#fffde7')
          setI('در انتظار تایید ')
          setM('تایید شده')
          setPhoneN(phone);
          setMessage(<span>ما تشخیص داده ایم که احتمالا این کاربر از قبل عضو صندوق بوده است. این کاربر در تاریخ <span dir={"ltr"}>{joinDate}</span> درخواست عضویت داده است. لطفا اطلاعات او را دقیق بررسی کنید و درصورت امکان با او تماس بگیرید.</span>)
        }else {
          setIC(<ReportRoundedIcon className="userContIcon" style={{color:'#FFBB00', fontSize:40}} />)
          setV('#FFBB00')
          setC('#fffde7')
          setI('در انتظار تایید ')
          setI('در انتظار تایید ')
        }
      }
    }else {
      setIC(<ReportRoundedIcon className="noVerified userContIcon" style={{color:'#F65314', fontSize:40}}/>)
      setV('#F65314')
      setC('#fbe9e7')
      setI('تایید نشده ')
      setM('تایید نشده ')
      setMessage(<span>ما نتوانستیم هویت این کاربر را تایید کنیم. ممکن است یک عضو جدید باشد. این کاربر در تاریخ <span dir={"ltr"}>{joinDate}</span> درخواست عضویت داده است.اگر او را می شناسید با او تماس بگیرید تا اطمینان حاصل کنید. در غیر اینصورت میتوانید اورا حذف کنید.</span>)
    }
  }, [1])


  return (
    <div
    dir={"rtl"}
    className={"userProfileCont"}
    >
      <h1 className={"userProfileHed"} >{name}</h1>
      <div className={"userProfileStat"} style={{color:v, border: `solid ${v} 1px`, backgroundColor:c}}>
        <h3 style={{borderBottom:`solid ${v} 1px`}}>وضعیت: {i}
          <span style={{fontSize:12}}>(کلیک کنید)</span>
        </h3>
        <div className={"userProfileStatDit"}>
          <p><span>کد ملی ({m}):</span><span>{(ncode.toString().split('').length == 10)?(ncode):
          (ncode.toString().split('').length == 9)?("0"+ncode):("00"+ncode)}</span></p>
          <p className={"userProfileStatDitMess"} >{message}</p>
        </div>
        {iC}
      </div>
      ماهیانه: {monthly}
    </div>
  );
}
export default UserProfile;
