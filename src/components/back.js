import React, {useState, useEffect} from 'react';
import {
  Link,
} from 'react-router-dom';

const GoBack = ({path}) => {

  return (
    <div className="goBack">
      <Link to={path}>
        <span class="material-icons goBackIcon">keyboard_backspace</span>
      </Link>
    </div>
  );
}

export default GoBack;
