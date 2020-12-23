import React, {useState, useEffect} from 'react';
import AddUserInfoInput from './addUserInfoInput';
import {addUserInputConstPub} from '../constants/addUserInputConst';

const AddUserInfoDetail = ({getValue, summary, haveTextarea, addUserInfo}) => {
  const[name, setName] = useState('');
  const[hed, setHed] = useState('');
  const[counter, setCounter] = useState(0)
  const[nameDes, setNameDes] = useState()
  const[textarea, setTextarea] = useState()

  useEffect(() => {
    if (haveTextarea) {
      setTextarea(<><h3>توضیحات</h3><textarea
      style={{resize:'vertical', height:150}}
        className="addUserInfo-date-in login-input"
        onChange={(e) => {
          setNameDes(e.target.value);
          getValue(e.target.value)
          }
        }
        value={nameDes}
        placeholder="توضیحات اضافه را اینجا بنویسید"
      ></textarea></>)
    }
  },[hed])

  const input = addUserInputConstPub.map(
    (item, i)=>(
      <AddUserInfoInput
      key={i}
      title={item.title}
      label={item.label}
      placeholder={item.placeholder}
      p={item.p}
      className={item.className}
      type={item.type}
      required={item.required}
      min={item.min}
      max={item.max}
      step={item.step}
      getValue={getValue}
      />
    )
  )

  return (
    <>
    <details
    className="addUserInfo-name-more"
    onClick={() => {
      if (counter == 0) {
        document.querySelector('.addUserInfo-name-more > summary').style.padding = '7px 7px 15px 7px';
        document.querySelector('.addUserInfo-name-more > summary').style.borderRadius = '10px 10px 0 0';
        setCounter(1);
      }
      else {
        document.querySelector('.addUserInfo-name-more > summary').style.padding = '7px';
        document.querySelector('.addUserInfo-name-more > summary').style.borderRadius = '10px';
        setCounter(0);
      }
      }}
    >
      <summary>{summary}</summary>
      <div
      style={{padding:'30px 10px',borderTop:'solid #eee 1px',backgroundColor: '#fbfbfb', borderRadius:'0 0 10px 10px'}}
      onClick={(e) => {
        e.stopPropagation();
      }}
      >
        {input}
        {textarea}
      </div>
    </details>
    </>
      )
}

export default AddUserInfoDetail;
