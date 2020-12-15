import React, {useState, useEffect} from 'react';
import {
  Link,
  Director,
  useHistory,
  useLocation,
  withRouter
} from 'react-router-dom';
import io from 'socket.io-client';
import host from '../constants/host'
const socket = io.connect(host,{transports: ['websocket']});

const Register = ({isVerified}) => {
  document.title = 'ثبت نام در صندوق یار';
  const[userValue, setUserValue] = useState('');
  const[emailValue, setEmailValue] = useState('');
  const[passValue, setPassValue] = useState('');
  const[error, setError] = useState(false);
  const[registered, setRegistered] = useState(false);

  useEffect(() => {
    socket.on('isUsr',function (e) {
      if (e) {
        setError('این نام کاربری درحال حاضر موجود است')
      }else {
        setError('')
      }
    })
  }, [error])
  useEffect(() => {
    socket.on('siggnUpOk',function (e) {
      if (e) {
        setRegistered(true);
        isVerified(true)
      }else {
        alert('اوه! مشکلی رخ داد! لطفا دوباره تلاش کنید.')
        isVerified(false)
      }
    })
  }, [registered])

  return (
    <form className="login" dir="rtl" onSubmit={
      (event) => {
        event.preventDefault();
        socket.emit('usrinfo', {userValue, emailValue, passValue})
      }
    }>
      <input className="login-input"
      type="text"
      value={userValue}
      onChange={(
        (e)=>{
          const user = e.target.value;
          setUserValue(user)
          socket.emit('checkUsername', user)
          console.log(user);
          if (user == '') {
            console.log(user);
            setError('')
          }
        }
      )}
      placeholder="یک نام کاربری برای خود انتخاب کنید"
      required
       />
     <input className="login-input"
     type="text"
     value={emailValue}
     onChange={((e)=>{setEmailValue(e.target.value)})}
     placeholder="یک ایمیل معتبر وارد کنید"
      />
      <input className="login-input"
      type="password"
      value={passValue}
      onChange={((e)=>{setPassValue(e.target.value)})}
      placeholder="یک رمزعبور قوی انتخاب کنید"
      required
      />
      <div className="form-error">{error}</div>
      <div className="button-cont">
        <Link className="create-account" to={'/ورود'}>
          ورود
        </Link>
        <button className="submit-button">ایجاد حساب</button>
      </div>
    </form>
  );
}

export default Register;
