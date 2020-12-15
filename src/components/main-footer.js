import React, {useState, useEffect} from 'react';
import {
  Link,
  Director
} from 'react-router-dom';

const Footer = () => {
  const[value, setValue] = useState('');

  return (
    <div className="main-footer">
      <Link className="footer-item" to={"/راهنما"}>راهنما</Link>
      <Link className="footer-item" to={"/خصوصی"}>حریم خصوصی</Link>
      <Link className="footer-item" to={"/شرایط"}>شرایط</Link>
    </div>
  );
}

export default Footer;
