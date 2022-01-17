import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import App1 from './ClassComponents';
import App2 from './FunctionComponent';

ReactDOM.render(
  <>
    <App1 />
    <App2 />
  </>,
  document.getElementById('root')
);
