import React, {useState, useEffect} from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import UnderStr from './underStrc';
import Section from './manager-sec';
import Managment from './managmentCont';
import AddInfo from "./addInfo"
import {sectionContent} from '../constants/section-content.js'
import Users from './users'
import GoBack from './back';
import Alert from './alert';

const Main = ({changePath, addUserInfo, changeBackIconPath, logedInUser, manager}) => {
  const[list, setList] = useState(0)
  const[sectionComp, setSectionComp] = useState(sectionContent)

  const onTicked = (e, k) =>{
    delete sectionContent[k];
    setList(list+1)
  }

  useEffect(()=>{
    setSectionComp(
      sectionContent.map((item, i) => (
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
  }, [list])


  return (
    <Switch>
      <Route path={'/manager/add'}>
        <AddInfo changePath={changePath} addUserInfo={addUserInfo} changeBackIconPath={changeBackIconPath}/>
      </Route>
      <Route path={'/manager/users'}>
        <Users changePath={changePath} logedInUser={logedInUser} addUserInfo={addUserInfo} changeBackIconPath={changeBackIconPath}/>
      </Route>
      <div className="section-cont">
        <Route path={'/manager/database'}>
          <UnderStr changeBackIconPath={changeBackIconPath}/>
        </Route>
        <Route path={'/manager/reports'}>
          <UnderStr changeBackIconPath={changeBackIconPath} />
        </Route>
        <Route path={'/manager/emailVeification'}>
          <UnderStr changeBackIconPath={changeBackIconPath} />
        </Route>
        <Route path={'/manager'} exact>
          {sectionComp}
          <Managment changePath={changePath}/>
        </Route>
        <Route path={'/manager/alert'}>
            <Alert username={logedInUser} manager={manager}/> 
        </Route>
      </div>
    </Switch>
  );
}

export default Main;
