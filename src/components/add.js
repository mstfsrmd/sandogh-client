import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Add = () => {
  return (
    <Link to={'/manager/add'} className="mngr-add-info-cont" dir="rtl">
      <div className="mngr-add-info" dir="rtl">
        <div className="mngr-add-info-icon"dir="rtl">
        <span class="material-icons" style={{fontSize:50, color:'white'}} >add</span>
        </div>
      </div>
    </Link>
  );
}

export default Add;
