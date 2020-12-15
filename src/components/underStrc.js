import React from 'react';
import {
  useHistory,
  useLocation,
} from 'react-router-dom';

const UnderStr = () => {
  let history = useHistory()
  document.title = 'صفحه در دست ساخت';
  return (
    <div className="header" dir="rtl">
      <h1 className="header-h1" style={{fontSize:60}}><span className="header-h1-red">در</span><span className="header-h1-green">دس</span><span className="header-h1-blue">ت </span><span className="header-h1-yellow">سا</span><span className="header-h1-blue">خت</span><span className="header-h1-red">!</span></h1>
      <p className="notfound-p" style={{marginTop:-10}}>کارگران مشغول کارند!</p>
      <p className="notfound2-p">URL درخواست شده ی "<span dir="ltr">{useLocation().pathname}</span>" هنوز در حال کدنویسی است.</p>
      <div  className="notfound2-ret" onClick={() => {history.goBack()}}>بازگشت</div>
    </div>
  );
}

export default UnderStr;
