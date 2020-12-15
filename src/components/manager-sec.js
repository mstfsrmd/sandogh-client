import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

const Section = ({path, title, content, onTicked, id}) => {
  const[counter, setCounter] = useState(0)
  const[status, setStatus] = useState(false)
  const[decoration, setDecoration] = useState('none')
  const[opacity, setOpacity] = useState(1)
  const[ticked, setTicked] = useState('')
  const[animated, setAnimated] = useState('')

  const history = useHistory();

  return (
    <div className={"section"}
    dir="rtl"
    done={status}
    style={{animation:animated}}
    onClick={
      () => {
        if (!status) {
          history.push(path)
          onTicked(true, id)
        }
      }
    }>
      <h1 className="section-title">
        <span style={{textDecoration:decoration, opacity:opacity}}>{title}</span>
        <div className="done" onClick={
          (e) => {
            e.stopPropagation();
            if (counter == 0) {
              setStatus(true);
              setDecoration('line-through')
              setCounter(1);
              setOpacity(.5);
              setTicked('check_circle')
              setAnimated('go 1s cubic-bezier(0.86,0.28,0.07,0.8) .2s forwards')
              setTimeout(() => {
                onTicked(true, id)
              }, 1000);
            }
          }
        }>
          <span class="material-icons" style={{fontSize:33, color:'#00A1F1'}}>{ticked}</span>
        </div>
      </h1>
      <p className="section-contant" style={{textDecoration:decoration, opacity:opacity}}>{content}</p>
    </div>
  );
}

export default Section;
