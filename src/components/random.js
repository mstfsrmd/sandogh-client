import React, {useState, useEffect} from 'react';

let c = [];
let color = 'white';
let r = Math.round(Math.random()*100);
for (var i = 1; i <= 100; i++) {
  c.push(i)
}

const Random = () => {

  const cell = c.map((item, i) => (<p key={i} id={"cell"+i} style={{backgroundColor: color}} className="randomCell"></p>))

  useEffect(()=>{
    setTimeout(function () {
      let rand = 9;
      for (var i = 0; i < 100; i++) {
        console.warn(rand);
        document.getElementById('cell'+rand+'').style.backgroundColor = '#87255B';
        let arrow = ['up', 'right', 'down', 'left']
        let randArrow =  arrow[Math.round(Math.random()*3)];
        console.log(randArrow);
        if (randArrow == 'left') {
          if ((rand+1)%10 == 0) {
            if (document.getElementById('cell'+(rand-1)+'').style.backgroundColor != '#87255B') {
              rand--;
            }else {
              i = 30
            }
          }else {
            if (document.getElementById('cell'+(rand+1)+'').style.backgroundColor != '#87255B') {
              rand++;
            }else {
              i = 30
            }
          }
        }if (randArrow == 'right') {
          if (rand%10 == 0) {
            rand++;
          }else {
            rand--;
          }
        }
        if (randArrow == 'up') {
          if ((rand-10)>0) {
            if (document.getElementById('cell'+(rand -10)+'').style.backgroundColor != '#87255B') {
              rand = rand -10;
            }else {
              i = 30
            }
          }
        }
        if (randArrow == 'down') {
          if ((rand+10)<100) {
            if (document.getElementById('cell'+(rand +10)+'').style.backgroundColor != '#87255B') {
              rand = rand +10;
            }else {
              i = 30
            }
          }
        }
        console.error(rand);
      }
    }, 1000);
  },[cell])

  return (
    <p className="random">{cell}</p>
  );
}
export default Random;
