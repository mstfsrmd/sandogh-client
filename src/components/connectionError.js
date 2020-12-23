import React from 'react';
import {
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';

const ConnectionError = () => {
  let history = useHistory()
  document.title = 'خطای ۵۰۳ (سرورپاسخگو نیست)';
  return (
    <div className="header-error" dir="rtl">
      <h1 className="notfound-h1"><span className="header-h1-red">۵</span><span className="header-h1-green">۰</span><span className="header-h1-blue">۳</span></h1>
      <p className="notfound-p">اوه! خرابکاری شد :(</p>
      <p className="notfound2-p">زمان اتصال به سرور تمام شد اما سرور پاسخ نداد. این یک مشکل از سمت ماست. لطفا بعدا امتحان کنید.</p>
      <div  className="notfound2-ret" onClick={() => {history.goBack()}}>بازگشت</div>
    </div>
  );
}

export default ConnectionError;
