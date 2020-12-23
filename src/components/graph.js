import React, {useState, useEffect} from 'react';
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';
import {PathLine} from 'react-svg-pathline'
import UnderStr from './underStrc';
import Section from './manager-sec';
import io from 'socket.io-client';
import host from '../constants/host'
import moment from 'jalali-moment';
const socket = io.connect(host,{transports: ['websocket']});

let day = [];
let thisDay = parseInt(moment().locale('fa').format('D'));
let d = parseInt(moment().locale('fa').format('D'));
let thisM = parseInt(moment().locale('fa').format('M'));
let grph = [];
if (d == 31) {
  d = 30;
  thisDay = 30;
}

let xPos = 310 - 10*d;

//console.log(thisDay);

for (var i = 0; i < 30; i++) {
  grph.push({x:thisDay, y:100});
  thisDay --;
}

for (var i = 1; i <= 30; i++) {
  day.push({x:i, y:100})
}

//console.log(grph);


const Graph = ({activity}) => {
  //console.log(activity);
  const [data, setData] = useState()
  const [g, setG] = useState(grph)
  let c = 0;
  let h = {};
  let pLine = [];

  //console.log(activity);

  useEffect(() => {
    const sd = activity.map((item, i) =>{
      if (item != '') {
        let d = item.split(' ')[0].split('/')[2];
        //console.log(item.split(' ')[0]);
        let f = activity[i+1];
        h[d] = c+1;
        if (f) {
          //console.log(item, activity[i+1]);
          if (d != f.split(' ')[0].split('/')[2]) {
            c = 0;
          }else {
            c++
          }
        }
        return h
      }
    });
    ////console.log("###########################################");
    setData(sd[0]);
  }, [1])



  useEffect(() => {
    //console.log(data);
    grph.forEach((item, i) => {
      if (data) {
        //console.log(data);
        let xX = 10*(item.x), yY = (item.y), match;
        for (var j = 0; j < Object.keys(data).length; j++) {
          if (Object.keys(data)[j]>d) {
            match = 10*(Object.keys(data)[j]-30)
            if (xX == match) {
              /*//console.log(100-Object.values(data)[j]);
              console.log(Object.keys(data)[j]);
              console.log("thisDay "+d);
              console.log("match "+match);
              console.log("xX "+xX);
              console.log(data);//*/
              pLine.push({x:xX, y:(100-Object.values(data)[j])})
            }else {
              if (!pLine[i]) {
                pLine.push({x:xX, y:yY})
                ////console.warn("match "+match);
                ////console.warn("xX "+xX);
              }
            }
          }else{
            match = 10*(Object.keys(data)[j])
            if (xX == match) {
              /*//console.log(100-Object.values(data)[j]);
              console.log(Object.keys(data)[j]);
              console.log("thisDay1 "+d);
              console.log("match1 "+match);
              console.log("xX1 "+xX);
              console.log(data);//*/
              pLine.push({x:xX, y:(100-Object.values(data)[j])})
            }else {
              if (!pLine[i]) {
                pLine.push({x:xX, y:yY})
                ////console.warn("match1 "+match);
                ////console.warn("xX1 "+xX);
              }
            }
          }

        }
      }else {
        setG(grph);
        ////console.log('DDDDDDDDDDDDDD');
      }
    });
    if (pLine != '') {
      setG(pLine);
      //console.log(pLine);
    }
    ////console.log(g);
  }, [data])

  return (
    <>
      <svg className="activityDiag" width={210} height={70}>
        <defs>
          <linearGradient id="gradient-303647730" x1="0" x2="0" y1="1" y2="0">
            <stop offset="10%" stopColor="#9be9a8"></stop>
            <stop offset="100%" stopColor="#216e39"></stop>
        </linearGradient>
        </defs>
        <PathLine
         stroke="url(#gradient-303647730)"
         className="activityLine"
         style={{transform: `scale(.6) translate(${xPos}px , 0px)`}}
         points={g}
         strokeWidth="2"
         fill="none"
         strokeLinecap="round"
         r={2}
         />
      </svg>
      <h1></h1>
      </>
  );
}
export default Graph;
