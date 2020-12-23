import React, {useState, useEffect} from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import UnderStr from './underStrc';
import Section from './manager-sec';
import AddUserInfo from './addUserInfo';
import {sectionContentAdd} from '../constants/section-content.js'


const AddInfo = ({changePath, addUserInfo, changeBackIconPath}) => {
  const[list, setList] = useState(0)
  const[sectionCompAdd, setSectionCompAdd] = useState(sectionContentAdd)

  const onTicked = (e, k) =>{
    delete sectionContentAdd[k];
    setList(list+1)
  }

  const submit = (e) =>{
    //console.log(e);
  }

  useEffect(()=>{
    changeBackIconPath('/manager')
    setSectionCompAdd(
      sectionContentAdd.map((item, i) => (
        <Section
          id={i}
          key={item[0]}
          path={item[3]}
          title={item[1]}
          content={item[2]}
          onTicked={onTicked}
        />
      ))
    )
    changePath('/manager/add/user')
  }, [list])

  return (
    <div className="addInfo-cont" onClick={submit}>
      <Route path={'/manager/add'} exact>
        {sectionCompAdd}
      </Route>
      <Route path={'/manager/add/user'}>
        <AddUserInfo addUserInfo={addUserInfo} changeBackIconPath={changeBackIconPath} />
      </Route>
    </div>
  );
}
export default AddInfo;
