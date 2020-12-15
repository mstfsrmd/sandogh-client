import React, {useState, useEffect} from 'react';
import {
  Link,
  Director
} from 'react-router-dom';
import io from 'socket.io-client';
import host from '../constants/host'
const socket = io.connect(host,{transports: ['websocket']});

const Login = ({isVerified, isManager}) => {
  document.title = 'ورود به حساب کاربری';
  const[userValue, setUserValue] = useState('');
  const[passValue, setPassValue] = useState('');
  const[verified, setVerified] = useState(false);
  const[error, setError] = useState('');


  useEffect(() => {
    socket.on('verifyRes', function (e) {
      if (e.username) {
        if (e.cert) {
          setVerified(true)
          isManager(true)
          setError('')
        }else {
          setVerified(true)
          setError('')
          isVerified(true)
        }
      }else {
        setError('نام کارربری یا رمزعبور نادرست است')
        isVerified(false)
      }
    })
  },[verified])

  return (
    <form className="login" dir="rtl" onSubmit={
      (e)=>{
        e.preventDefault();
        socket.emit('verify', {userValue, passValue})
      }
    }>
      <input className="login-input"
      type="text"
      value={userValue}
      onChange={((e)=>{setUserValue(e.target.value)})}
      placeholder="نام کاربری خود را وارد نمایید"
      required
      autoComplete="true"
       />
      <input className="login-input"
      type="password"
      value={passValue}
      onChange={((e)=>{setPassValue(e.target.value)})}
      placeholder="رمز عبور خود را وارد نمایید"
      required
      autoComplete="true"
      />
      <div className="form-error">{error}</div>
      <div className="button-cont">
        <Link className="create-account" to={'/ثبت'}>
          ایجاد حساب
        </Link>
        <button className="login-button">ورود</button>
      </div>
    </form>
  );
}

export default Login;
