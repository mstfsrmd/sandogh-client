import React, {useState, useEffect} from 'react';
import {
  Link,
  Director
} from 'react-router-dom';

const Footer = () => {
  const[value, setValue] = useState('');

  return (
    <div className="main-footer">
      <Link className="footer-item" to={"/help"}>راهنما</Link>
      <Link className="footer-item" to={"/privacy"}>حریم خصوصی</Link>
      <Link className="footer-item" to={"/terms"}>شرایط</Link>
    </div>
  );
}

export default Footer;
