import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Speiseplan from './Speiseplan/Speiseplan'
import Register from './Register/Register'
import Main from './Main/Main'

function Content() {
    let params = (new URL(document.location)).searchParams;
    let old_url = params.get("url");
    let ret
    if(typeof old_url!='undefined' && old_url){
        if(old_url=="/"){
            ret = <Main />
        } else if(old_url=="/speiseplan"){
            ret = <Speiseplan />
        } else {
            ret = <Register />
        }
    } else {
        ret = <Router><Route exact path="/" component={Main} /><Route path="/speiseplan" component={Speiseplan} /><Route path="/register" component={Register} /></Router>
    }
    return ret
}

export default Content