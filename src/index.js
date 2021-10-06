import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import MyHeader from './components/MyHeader';
import Content from './components/Content';
import MyFooter from './components/MyFooter';
import Login from './components/Login/Login';

let url = window.location.pathname
let params = (new URL(document.location)).searchParams;
let old_url = params.get("url");
url = url.replaceAll("/","")
if ( typeof old_url == 'string' && old_url )
{
  old_url = old_url.replaceAll("/","")
}
console.log(url, old_url)

if(url=="login"){
  ReactDOM.render(
    <Login url={old_url}/>, document.getElementById("login")
  )
  ReactDOM.render(
    <MyHeader url={old_url}/>,
  document.getElementById('header')
  );
  ReactDOM.render(
    <Content url={old_url}/>,
  document.getElementById('content')
  );
  ReactDOM.render(
    <MyFooter url={old_url}/>,
  document.getElementById('footer')
  );
} else {
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
);
}