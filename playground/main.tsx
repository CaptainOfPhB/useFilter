import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import ClassComp from './ClassComp';
import FunctionComp from './FunctionComp';

ReactDOM.render(
  <>
    <ClassComp />
    <FunctionComp />
  </>,
  document.getElementById('root')
);
