import React, { useEffect } from 'react'
import {Route, useLocation, BrowserRouter as Router} from 'react-router-dom';
import Speiseplan from './Speiseplan/Speiseplan'
import Register from './Register/Register'
import Main from './Main/Main'
import history from '../history';

function Content() {
    let old_url
    let ret
    if(typeof old_url!='undefined' && old_url){
        document.getElementById('app').className="blur";
        document.getElementById('footer').className="blurfooter";
        document.getElementById('login').className="";
        if(old_url=="/"){
            ret = <Main />
        } else if(old_url=="/speiseplan"){
            ret = <Speiseplan />
        } else {
            ret = <Register />
        }
    } else {
        ret = <Router history={history}><Route exact path="/" component={Main} /><Route path="/speiseplan" component={Speiseplan} /><Route path="/register" component={Register} /></Router>
    }
    return ret
}

export default Content