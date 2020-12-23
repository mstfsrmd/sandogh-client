import React from 'react';
import {
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';

const NotFound = () => {
  let history = useHistory()
  document.title = 'خطای ۴۰۴ (صفحه مورد نظر یافت نشد)';
  return (
    <div className="header-error" dir="rtl">
      <h1 className="notfound-h1"><span className="header-h1-red">۴</span><span className="header-h1-green">۰</span><span className="header-h1-blue">۴</span></h1>
      <p className="notfound-p">اوه! بنظر می رسد اشتباه آمدید :(</p>
      <p className="notfound2-p">URL درخواست شده ی <span dir="ltr">{useLocation().pathname}</span> در این سرور پیدا نشد.</p>
      <div  className="notfound2-ret" onClick={() => {history.goBack()}}>بازگشت</div>
    </div>
  );
}

export default NotFound;
