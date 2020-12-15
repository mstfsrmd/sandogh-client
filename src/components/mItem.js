import React, {useState, useEffect} from 'react';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import UnderStr from './underStrc';
import Section from './manager-sec';
import sectionContent from '../constants/section-content.js'

const MItem = ({title, content, path, color}) => {
  const history = useHistory();

  return (
    <div className="mItem"
    dir={'rtl'}
    style={{backgroundColor:color}}
    onClick={
      () => {
        history.push(path)
      }
    }
    >
      <h1 className="mItem-h1">{title}</h1>
      <p className="mItem-p">{content}</p>
    </div>
  );
}

export default MItem;
