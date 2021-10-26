import React from 'react';
import ReactDOM from 'react-dom';
import MyHeader from './components/MyHeader';
import Content from './components/Content';
import MyFooter from './components/MyFooter';

ReactDOM.render(
  <MyHeader />,
  document.getElementById('header')
);
ReactDOM.render(
  <Content />,
  document.getElementById('content')
);
ReactDOM.render(
  <MyFooter />,
  document.getElementById('footer')
)
