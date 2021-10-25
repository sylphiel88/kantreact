import {IoMdLogIn, IoIosArrowDown} from "react-icons/io"
import React,{createRef, useEffect, useState} from 'react'
import Title from "./Header/Title"
import Navbar from "./Header/Navbar"
import Navitem from "./Header/Navitem"
import { Route, BrowserRouter as Router } from 'react-router-dom';
import InformationModal from "./InformationModal"

function MyHeader(props) {
  const [modal, setModal] = useState()
  const [message, setMessage] = useState("")

  function modalHandler() {
    setModal(false)
  }

  let params = (new URL(document.location)).searchParams;
  let old_url = params.get("url");
  if(old_url=="/"){
    old_url="Kantine"
  }
  if(old_url){
    old_url=old_url.replaceAll("/","")
    old_url=old_url.charAt(0).toUpperCase() + old_url.slice(1)
  }
  
  console.log(modal);

  return (
    <Navbar>
      <Router>
        <Route exact path="/" render={() => <Title><a href="/">Kantine</a></Title>} />
        <Route path="/login" render={() => <Title><a href="/">{old_url}</a></Title>} />
        <Route path="/speiseplan" render={() => <Title><a href="/">Speiseplan</a></Title>} />
        <Route path="/register" render={() => <Title><a href="/">Registrieren</a></Title>} />
      </Router>
      <Navitem icon={<IoMdLogIn/>} nummer="1" modalHandler={setModal} messageHandler={setMessage}>Hallo</Navitem>
      <Navitem icon={<IoIosArrowDown/>} modalstate={modal} modalHandler={setModal} messageHandler={setMessage} nummer="2"></Navitem>
      {modal && <InformationModal open={modal} openHandler={modalHandler} text={message} />}
    </Navbar>
  )
}

export default MyHeader;
