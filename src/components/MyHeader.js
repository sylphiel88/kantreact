import {IoMdLogIn, IoIosArrowDown} from "react-icons/io"
import React,{createRef} from 'react'
import Title from "./Header/Title"
import Navbar from "./Header/Navbar"
import Navitem from "./Header/Navitem"
import { Route, BrowserRouter as Router } from 'react-router-dom';

function MyHeader() {
  let params = (new URL(document.location)).searchParams;
  let old_url = params.get("url");
  if(old_url=="/"){
    old_url="Kantine"
  }
  return (
    <Navbar>
      <Router>
        <Route exact path="/" render={() => <Title><a href="/">Kantine</a></Title>} />
        <Route path="/login" render={() => <Title><a href="/">{old_url}</a></Title>} />
        <Route path="/speiseplan" render={() => <Title><a href="/">Speiseplan</a></Title>} />
        <Route path="/register" render={() => <Title><a href="/">Registrieren</a></Title>} />
      </Router>
      <Navitem icon={<IoMdLogIn/>} nummer="1">Hallo</Navitem>
      <Navitem icon={<IoIosArrowDown/>} nummer="2">
      </Navitem>
    </Navbar>
  )
}

export default MyHeader;
