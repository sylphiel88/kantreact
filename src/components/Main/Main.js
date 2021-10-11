import React, { useState, useEffect } from "react"
import axios from "axios"
import { IoConstructOutline } from "react-icons/io5";

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
                    } else {
                        setLogin(true)
                        setUser(response.data.dec)
                    }
                }
                axios.get('http://localhost:5000/api/v1/user/usergroup', {
                    headers: {
                        "user": response.data.dec
                    }
                }).then(response => {
                    setUserGr(response.data.ug)
                })
            })

        let ret
        if (loggedIn) {
            ret = <h1>Hallo {user} der Nutzergruppe {usergr}</h1>
        } else {
            ret = <h1>Hallo Unbekannter</h1>
        }
        return ret
    }
}

export default Main