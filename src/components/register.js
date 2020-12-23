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
  const[codeValue, setCodeValue] = useState('');
  const[phoneValue, setPhoneValue] = useState('');
  const[passValue, setPassValue] = useState('');
  const[error, setError] = useState(false);
  const[registered, setRegistered] = useState(false);

  useEffect(() => {
    socket.on('isUsr',function (e) {
      if (e) {
        setError('این نام کاربری درحال حاضر موجود است')
        document.getElementById('register-button').disabled = true;
        document.getElementById('register-button').style.opacity = .6;
        document.getElementById('register-button').style.cursor = 'not-allowed'
      }else {
        setError('')
        document.getElementById('register-button').disabled = false;
        document.getElementById('register-button').style.opacity = 1;
        document.getElementById('register-button').style.cursor = 'pointer'
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

  useEffect(() => {
    socket.on('isCode',function (e) {
      if (e) {
        console.log(e);
        document.getElementById('register-button').disabled = true;
        document.getElementById('register-button').style.opacity = .6;
        document.getElementById('register-button').style.cursor = 'not-allowed'
        if (e !== true) {
          setError('این کد ملی درحال حاضر موجود است اما اعتبار آن هنوز تایید نشده است. اگر مطمئنید این کد برای شماست به راهنما مراجعه کنید.')
        }else {
          setError('این کد ملی درحال حاضر موجود است')
        }
      }else {
        setError('')
        document.getElementById('register-button').disabled = false;
        document.getElementById('register-button').style.opacity = 1;
        document.getElementById('register-button').style.cursor = 'pointer'
      }
    })
  }, [error])

  return (
    <form className="login" dir="rtl" onSubmit={
      (event) => {
        event.preventDefault();
        socket.emit('usrinfo', {userValue, passValue, codeValue, phoneValue})
      }
    }>
    <div>
      <input className="login-input first-input-lineR"
      type="text"
      value={userValue}
      onChange={(
        (e)=>{
          const user = e.target.value;
          setUserValue(user)
          //socket.emit('checkUsername', user)
          if (user == '') {
            setError('')
          }
        }
      )}
      onFocus={(
        (e)=>{
          document.getElementById('input-sub-n').style.display = 'block';
        }
      )}
      onBlur={(
        (e)=>{
          document.getElementById('input-sub-n').style.display = 'none';
        }
      )}
      placeholder="نام و نام خانوادگی "
      required
       />
      <input className="login-input first-input-lineL"
      type="text"
      maxLength={12}
      value={codeValue}
      onChange={(
        (e)=>{
          const code = e.target.value;
          socket.emit('checkNCode', code)
          if (code == '') {
            setError('')
          }if (code.length == 3 || code.length == 10 ) {
            setCodeValue(code+"-")
          }else {
            setCodeValue(code)
          }
        }
      )}
      onFocus={(
        (e)=>{
          document.getElementById('input-sub-u').style.display = 'block';
        }
      )}
      onBlur={(
        (e)=>{
          document.getElementById('input-sub-u').style.display = 'none';
          let a = [];
          let codeArray = e.target.value.replace("-", "").replace("-", "").split('');
          for (var i = 0; i <= 8; i++) {
            a.push(codeArray[i] * (10 - i))
          }
          console.log(codeArray)
          let r = (a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6]+a[7]+a[8])%11;
          if (e.target.value != '') {
            if (r < 2) {
              if (codeArray[9] != 2) {
                setError("کد ملی صحیح نیست. از انگلیسی بودن اعداد اطمینان حاصل کنید")
                document.getElementById('register-button').disabled = true;
                document.getElementById('register-button').style.opacity = .6;
                document.getElementById('register-button').style.cursor = 'not-allowed'
              }else {
                setError("")
              }
            }else {
              if (codeArray[9] != (11-r)) {
                setError("کد ملی صحیح نیست. از انگلیسی بودن اعداد اطمینان حاصل کنید")
                document.getElementById('register-button').disabled = true;
                document.getElementById('register-button').style.opacity = .6;
                document.getElementById('register-button').style.cursor = 'not-allowed'
              }else if (!error == 'این کد ملی درحال حاضر موجود است اما اعتبار آن هنوز تایید نشده است. اگر مطمئنید این کد برای شماست به راهنما مراجعه کنید.') {
                setError("")
              }
            }
          }
        }
      )}
      placeholder="کد ملی"
      required
       />
      </div>
      <p className={"input-sub"} id={'input-sub-n'}>لطفا نام و نام خانوادگی خود را کامل و با یک فاصله در بین وارد کنید. این به سیستم کمک میکند تا اگر عضو صندوق بوده اید شما را شناسایی کند.</p>
      <p className={"input-sub"} id={'input-sub-u'}>کد ملی شما تنها در اختیار مدیران قرار خواهد گرفت تا اگر قبلا عضو صندوق بودید شما را شناسایی کنند و اگر عضو جدید هستید، شناسه منحصر به فرد شما باشد. پس از تایید، می توانید آن را تغییر دهید. برای اطلاعات بیشتر میتوانید به <Link to="/privacy" style={{color: 'black'}}>سیاست حریم خصوصی ما </Link> مراجعه کنید.</p>
      <div>
       <input className="login-input"
       type="tel"
       value={phoneValue}
       onChange={((e)=>{setPhoneValue(e.target.value)})}
       placeholder="یک شماره تلفن همراه وارد کنید"
        />
      </div>
      <div>
        <input className="login-input"
        type="password"
        value={passValue}
        onChange={((e)=>{setPassValue(e.target.value)})}
        placeholder="یک رمزعبور قوی انتخاب کنید"
        required
        />
      </div>
      <div className="form-error">{error}</div>
      <div className="button-cont">
        <Link className="create-account" to={'/login'}>
          ورود
        </Link>
        <button id="register-button" className="submit-button">ایجاد حساب</button>
      </div>
    </form>
  );
}

export default Register;
