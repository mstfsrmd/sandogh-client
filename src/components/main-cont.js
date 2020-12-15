import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import UnderStr from './underStrc';
import Section from './manager-sec';
import Managment from './managmentCont';
import sectionContent from '../constants/section-content.js'

const Main = () => {
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
    <div className="section-cont">
      <Switch>
        <Route path={'/manager/add'}>
          <UnderStr />
        </Route>
        <Route path={'/manager/database'}>
          <UnderStr />
        </Route>
        <Route path={'/manager/users'}>
          <UnderStr />
        </Route>
        <Route path={'/manager/reports'}>
          <UnderStr />
        </Route>
        <Route path={'/manager/emailVeification'}>
          <UnderStr />
        </Route>
        <Route path={'/manager'}>
          {sectionComp}
          <Managment />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
