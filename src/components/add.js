import React, {useState ,useEffect} from 'react';
import {
  Link,
  useHistory,
  useLocation
} from 'react-router-dom';
import io from 'socket.io-client';
import host from '../constants/host'
const socket = io.connect(host,{transports: ['websocket']});

const Add = ({path, addUserInfo, sentToServer}) => {
  const[icon , setIcon] = useState('add')
  const[p , setP] = useState(path)
  const history = useHistory();
  const location = useLocation();


  useEffect(() => {
    if (location.pathname == '/manager/add/user') {
      setIcon('how_to_reg')
      setTimeout(function () {

      }, 500);
    }else {
      setIcon('add')
    }
  })

  useEffect(() => {
    socket.on('result', function (e) {
      if (e == "phone") {
        alert('به نظر می آید شما در قسمت شناسه کاربری، یک شماره تماس وارد کردید. این پیام را می بینید چون احتمالا آن را به فرمت صحیح وارد نکرده اید یا ما آن را به اشتباه شماره تماس تشخیص داده ایم. لطفا دوباره تلاش کنید.')
      }else if (e == "nCode") {
        alert('به نظر می آید شما در قسمت شناسه کاربری، یک کد ملی وارد کردید. این پیام را می بینید چون احتمالا آن را به فرمت صحیح وارد نکرده اید یا ما آن را به اشتباه کد ملی تشخیص داده ایم. لطفا دوباره تلاش کنید.')
      }else if (e == "name") {
        alert('لطفا نام کاربر را وارد کنید')
      }else if (e == "monthly") {
        alert('لطفا مبلغ پرداختی ماهانه را وارد کنید')
      }else if (e == "id") {
        alert("لطفا یک شناسه کاربری معتبر وارد کنید")
      }else {
        alert('با موفقیت ثبت شد')
        history.push('/manager/add')

      }
    })

  },[1])


  return (
    <Link to={path}
    className="mngr-add-info-cont"
    dir="rtl"
    onClick={(e) => {
      if (location.pathname == '/manager/add/user') {
        socket.emit('addUserInfo', addUserInfo)
      }
    }}
    >
      <div className="mngr-add-info" dir="rtl">
        <div className="mngr-add-info-icon"dir="rtl">
        <span className="material-icons" style={{fontSize:50, color:'white'}} >{icon}</span>
        </div>
      </div>
    </Link>
  );
}

export default Add;
