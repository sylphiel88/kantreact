import axios from "axios"
import React, { useEffect, useState } from "react"
import LoginFeld from './Login/LoginFeld'
import SignInFeld from "./Login/SignInFeld"
import SignUpFeld from "./Login/SignUpFeld"

function Login(props) {
    const [open, setOpen] = useState(true)
    const [eye, setEye] = useState(false)
    const [eye2, setEye2] = useState(false)
    const [signUp, setSignUp] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [passwordc, setPasswordc] = useState("")
    const [passwordtest, setPasswordtest] = useState(false)
    const [emailtest, setEmailtest] = useState("")
    const [msg, setMessage] = useState("")
    const [signInloaded, setSignInloaded] = useState(false)
    const [token, setToken] = useState("")
    const [usergr, setUsergr] = useState("adm")
    const [gotDeps, setGotDeps] = useState(false)
    const [deps, setDeps] = useState([])
    const [dep, setDep] = useState("Fachinformatik")

    useEffect(async ()=>{
        if(!gotDeps){
            await axios.get("http://localhost:5000/api/v1/class/getAllDepartments",{header:{ContentType: "application/json"}})
            .then(res => setDeps(res.data.deps))
            setGotDeps(true)
        }
    })

    useEffect(() => {
        console.log(token);
        if (token != "") {
            localStorage.setItem('authorization', token)
            props.handler(false)
        }
    }, [token])


    async function setEyeHandler() {
        console.log(password);
        setEye(!eye)
    }

    async function setEye2Handler() {
        setEye2(!eye)
    }

    async function setPwHandler() {
        console.log(password)
        var noCo = false
        // var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        // if(!re.test(this.state.password)){
        //     var noCo = true
        // } else {
        //     var noCo = false
        // }
        setPassword(document.getElementById("password").value)
        setPasswordtest(false)
    }

    async function setPw2Handler(pw) {
        var noCo = false
        // var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        // if(!re.test(this.state.password)){
        //     var noCo = true
        // } else {
        //     var noCo = false
        // }
        setPasswordc(document.getElementById("password2").value)
        setPasswordtest(false)
    }

    async function setUnHandler(un) {
        setUsername(un)
    }

    async function setEmHandler(em) {
        // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if (!re.test(this.state.email)) {
        //     await this.setState({emailtest: true})
        // } else {
        //     await this.setState({emailtest: false})
        // }
        setEmail(em)

    }

    async function signUpHandler() {
        if (signUp == false) {
            setPassword("")
            setUsername("")
            setEye(false)
            setEye2(false)
            setSignUp(!signUp)
            setSignInloaded(true)
        } else {
            if (username.length < 3) {
                var noUn = true
                console.log("Username must be 3 Chars or longer")
            }
            if (password.length < 3) {
                var noPw = true
                console.log("Password must be 3 Chars or longer")
            }
            if (passwordc.length < 3) {
                var noPw2 = true
                console.log("Password Confirm must be 3 Chars or longer")
            }
            let noCo = false
            let noEm = false
            // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            // if (!re.test(this.state.email)) {
            //     var noEm = true
            //     console.log("Not a valid email adress!")
            // }
            // re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
            // if(!re.test(this.state.password)){
            //     var noCo = true
            //     console.log("Passwords be at least 8 chars long and must contain an uppercase letter, a number and a special Character")
            // }
            if (password != passwordc) {
                var noMa = true
                console.log("Passwords are different")
            }
            if (!(noUn || noPw || noPw2 || noEm || noMa || noCo)) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                        usergr: usergr,
                        dep: dep
                    })
                };
                await fetch('http://localhost:5000/api/v1/user/signup', requestOptions)
                    .then(response => response.json())
                    .then(data => setMessage(data.message))
                    .then(setOpen(false))
                    .then(await props.handler())
            }
        }
    }


    async function signInHandler() {
        if (signUp == true) {
            setSignUp(!signUp)
            setPassword("")
            setUsername("")
            setEye(false)
            setEye2(false)
        } else {
            if (username.length < 3) {
                var noUn = true
                console.log("Username must be 3 Chars or longer")
            }
            if (password.length < 3) {
                var noPw = true
                console.log("Password must be 3 Chars or longer")
            }
            if (!(noUn || noPw)) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                };
                await fetch('http://localhost:5000/api/v1/user/signin', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setToken(data.authorization)
                        props.messageHandler(data.message)
                        props.modalHandler(true)
                    })
            }
        }
    }

    function nextGroup() {
        if (usergr == "adm") {
            setUsergr("par")
        } else if (usergr == "par") {
            setUsergr("doz")
        } else if (usergr == "doz") {
            setUsergr("coo")
        } else {
            setUsergr("adm")
        }
    }

    function backGroup() {
        if (usergr == "adm") {
            setUsergr("coo")
        } else if (usergr == "par") {
            setUsergr("adm")
        } else if (usergr == "doz") {
            setUsergr("par")
        } else {
            setUsergr("doz")
        }
    }

    function wheelHandler(e) {
        if (e.deltaY === 100) {
            nextGroup()
        }
        if (e.deltaY === -100) {
            backGroup()
        }
    }

    
    async function depSelHandler() {
        setDep(document.getElementById('depSelector').value)
    }

    useEffect(() => {
        if (open != props.stateo) {
            setOpen(props.stateo)
        }
    })

    if (open) {
        return (
            <LoginFeld signInloaded={signInloaded} signUp={signUp}>
                {!signUp?
                    <SignInFeld username={username}
                                password={password}
                                eye={eye}
                                passwordtest={passwordtest}
                                setUnHandler={setUnHandler}
                                setEyeHandler={setEyeHandler}
                                setPwHandler={setPwHandler}
                                signInHandler={signInHandler}
                                signUpHandler={signUpHandler}
                    />
                :
                    <SignUpFeld username={username}
                                password={password}
                                passwordc={passwordc}
                                eye={eye}
                                eye2={eye2}
                                usergr={usergr}
                                passwordtest={passwordtest}
                                setUnHandler={setUnHandler}
                                setEyeHandler={setEyeHandler}
                                setPwHandler={setPwHandler}
                                signInHandler={signInHandler}
                                signUpHandler={signUpHandler}
                                setEye2Handler={setEye2Handler}
                                setUsergr={setUsergr}
                                setPw2Handler={setPw2Handler}
                                wheelHandler={wheelHandler}
                                setEmHandler={setEmHandler}
                                deps={deps}
                                depSelHandler={depSelHandler}
                    />
                }
            </LoginFeld>
        )
    } else {
        return null
    }
}

export default Login