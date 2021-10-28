import React, { useState, useEffect } from "react"
import axios from "axios"
import Administrator from "./Administrator"
import Dozent from "./Dozent"

function useLocalStorage(key) {
    const [value, setValue] = useState(() => {
        if (typeof windows !== "undefined") {
            const saved = window.localStorage.getItem(key);
            if (saved !== null) {
                return saved
            }
        }
    })
    return [value, setValue]
};

function Main({prop}) {
    const [usergr, setUserGr] = useState();
    const [loggedIn, setLogin] = useState();
    const [user, setUser] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        setToken(window.localStorage.getItem('authorization'))
    }, [prop])

    if ((!token || token === "") && loggedIn) {
        setLogin(false)
    } else {
        axios.get('http://localhost:5000/api/v1/user/isLoggedIn', {
            headers: {
                "authorization": token
            }
        })
            .then(response => {
                console.log(response.data);
                if (!loggedIn && response.data.login) {
                    if (response.data.exp) {
                        setLogin(false)
                        window.location.href='/'
                    } else {
                        setLogin(true)
                        setUser(response.data.dec)
                    }
                }
                axios.get('http://localhost:5000/api/v1/user/getUserData', {
                    headers: {
                        "user": response.data.dec
                    }
                }).then(response => {
                    setUserGr(response.data.ug)
                })
            })

        let ret
        if(usergr === "Administrator"){
            ret=<div><div class="bgimage"></div><Administrator/></div>
        } else if(usergr==="Dozent"){
            ret=<div><div class="bgimage"></div><Dozent/></div>
        } else {
            ret=<div class="bgimage"></div>
        }
        return ret
    }
}

export default Main