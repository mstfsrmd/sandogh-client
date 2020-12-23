import React, {useState, useEffect} from 'react';

const AddUserInfoInput = ({dir, getValue, title, label, placeholder, p, className, type, required, changeHed, min, max, step, value, addUserInfo}) => {
  const[name, setName] = useState(value);
  const[hed, setHed] = useState('');

  useEffect(() => {
    if (changeHed) {
      changeHed(hed);
    }
  },[hed])

  return (
    <>
      <h3>{title} <span>{label}</span></h3>
      <input
        className={"login-input info-input"+className}
        onChange={(e) => {
          setName(e.target.value);
          getValue(e.target.value)
        }}
        onBlur={(e) => {
          setHed(<p className="addUserInfo-p">{e.target.value}</p>);
          if (e.target.value == '') {
            setHed('')
          }
        }}
        dir={dir}
        value={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        {...required}
      />
      <p className="addUserInfo-name-p">{p}</p>
    </>
      )
}

export default AddUserInfoInput;
