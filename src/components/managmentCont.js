import React, {useState, useEffect} from 'react';
import {
  Link,
} from 'react-router-dom';
import UnderStr from './underStrc';
import MItem from './mItem';
import mItemContent from '../constants/mItem-content.js'

const Managment = ({changePath}) => {
  const[list, setList] = useState(0)

  changePath('/manager/add')


  const mItemComp = mItemContent.map((item, i) => (
        <MItem
        id={i}
        key={i}
        title={item[0]}
        content={item[1]}
        path={item[2]}
        color={item[3]}
        />
      ))

  return (
    <div className="mItem-cont">
      {mItemComp}
    </div>
  );
}

export default Managment;
