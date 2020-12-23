import React, {useState, useEffect} from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import AddUserInfoInput from './addUserInfoInput';
import AddUserInfoDetail from './addUserInfoDetail';

const AddUserInfo = ({changePath, min, addUserInfo, changeBackIconPath}) => {
  const[toServer, setToServer] = useState([])
  const[nameDes, setNameDes] = useState()
  const[hed, setHed] = useState('')
  const[counter, setCounter] = useState(0)
  const changeHed = (e) => {
    setHed(e)
  }

  useEffect(()=>{
    addUserInfo(toServer)
  }, [toServer])
  
  useEffect(()=>{
    changeBackIconPath("/manager/add")
  }, [1])

  return (
    <form className="addUserInfo-cont" id="addUserInfo-cont" dir="rtl"
    onSubmit={(event) => {
      event.preventDefault();
    }}
    >
      <h1 className="addUserInfo-h1">ثبت اطلاعات کاربر</h1>
      {hed}
      <div className="addUserInfo-row addUserInfo-row-1">
        <AddUserInfoInput
        changeHed={changeHed}
        dir="rtl"
        title={'نام کاربر'}
        label={'(ضروری)'}
        type="text"
        className="addUserInfo-name-in"
        placeholder={"لطفا نام کاربر را کامل وارد کنید"}
        required={'required'}
        p={"اعضایی که قبلا عضو صندوق بوده اند تنها از طریق وارد کردن نام خود قادر به ورود به برنامه هستند."}
        getValue={(e) => {
          setToServer({...toServer, name:e});
        }}
        />

        <AddUserInfoInput
        title={'شناسه کاربر'}
        dir="ltr"
        label={'(ضروری)'}
        type="tel"
        className="addUserInfo-id-in"
        placeholder={"شماره تلفن یا کد ملی"}
        required={'required'}
        p={"برای اینکه در هنگام ثبت نام کاربر در سیستم بتوانیم مطمئن شویم که خود اوست، نیاز به اطلاعات منحصر بفرد او داریم."}
        getValue={(e) => {
          setToServer({...toServer, id:e});
        }}
        />

        <AddUserInfoDetail
        className="addUserInfo-name-more"
        summary="اطلاعات بیشتری برای وارد کردن هست؟"
        haveTextarea={true}
        getValue={(e) => {
          //setToServer({...toServer, more:e});
        }}
        />
      </div>
      <div className="addUserInfo-row addUserInfo-row-2">
        <AddUserInfoInput
        title={'پرداخت ماهیانه'}
        dir="ltr"
        label="(ضروری)"
        className={"addUserInfo-cash-in"}
        type="number"
        min={min}
        step="1000"
        placeholder={"کف پرداخت "+min+"ریال است."}
        getValue={(e) => {
          setToServer({...toServer, monthly:e});
        }}
        />

        <AddUserInfoInput
        title={'جمع پرداخت ها'}
        label=""
        dir="ltr"
        className={"addUserInfo-cashAll-in"}
        type="number"
        step="100000"
        min={500000}
        placeholder="به ریال"
        p="جمع کل پرداخت های کاربر تا این زمان، بدون احتساب وام ها"
        getValue={(e) => {
          setToServer({...toServer, cashAll:e});
        }}
        />

        <AddUserInfoInput
        title={'مبلغ آخرین وام'}
        dir="ltr"
        label=""
        className={"addUserInfo-debt-in"}
        type="number"
        step="100000"
        min={500000}
        placeholder="به ریال"
        p="مبلغ آخرین وام گرفته شده تا این زمان."
        getValue={(e) => {
          setToServer({...toServer, debt:e});
        }}
        />

        <AddUserInfoInput
        title={'تاریخ اخذ آخرین وام'}
        label=""
        className={"addUserInfo-debtDate-in"}
        type="date"
        getValue={(e) => {
          setToServer({...toServer, debtDate:e});
        }}
        />

        <AddUserInfoInput
        title={'پایان زمان پرداخت'}
        label=""
        className={"addUserInfo-debtExp-in"}
        type="date"
        p="اگر مشخصات عمومی صندوق را کامل کرده باشید، این فیلد به طور خودکار پر خواهد شد."
        getValue={(e) => {
          setToServer({...toServer, debtExp:e});
        }}
        />
      </div>
    </form>
  );
}
AddUserInfo.defaultProps = {
    min:'15000'
}
export default AddUserInfo;
