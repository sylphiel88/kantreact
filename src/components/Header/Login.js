import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import React, { useEffect, useState } from "react"
import { IoIosArrowRoundForward, IoIosCheckmark } from "react-icons/io"
import ReactTooltip from 'react-tooltip'

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
    const [deps, setDeps] = useState({})

    useEffect(async ()=>{
        if(!gotDeps){
            var array=[]
            await fetch('http://localhost:5000/api/v1/class/getAllDepartments',{method:"GET",headers:{"Content-Type":"application/json"}})
            .then(response => response.json())
            .then(data => setDeps({data}))
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
                        usergr: usergr
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

    function nextGroup(){
        if(usergr=="adm"){
            setUsergr("par")
        } else if(usergr=="par"){
            setUsergr("doz")
        } else if(usergr=="doz"){
            setUsergr("coo")
        } else {
            setUsergr("adm")
        }
    }

    function backGroup(){
        if(usergr=="adm"){
            setUsergr("coo")
        } else if(usergr=="par"){
            setUsergr("adm")
        } else if(usergr=="doz"){
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

    useEffect(() => {
        if (open != props.stateo) {
            setOpen(props.stateo)
        }
    })

    if (open) {
        return (
            <div className={!signInloaded ? "login-feld-signin" : signUp ? "login-feld-signup" : "login-feld-signin-2"} id="login-feld">
                <div className={signUp ? "absolutf" : "absolutf2"}>
                    <label for='username' style={{ color: "#f0f0f0" }}>Nutzername: </label>
                    <input id='username' type="text" className="inputl" onChange={(event) => setUnHandler(event.target.value)} value={username}></input>
                </div>
                <br /><br /><br />
                {signUp &&
                    <div>
                        <div><div className={signUp ? "absolutf" : "absolutf2"}><label for='email' style={{ color: "#f0f0f0" }}>Email: </label><div data-tip data-class="tt" data-for="email-tooltip"><input id='email' type="text" className={emailtest ? "inputl pwt" : "inputl pwt2"} onChange={(event) => setEmHandler(event.target.value)}></input></div></div><br /><br /><br /></div>
                    </div>
                }
                {signUp && emailtest && <ReactTooltip id="email-tooltip" >Keine Valide Email!</ReactTooltip>}
                <div className={signUp ? "absolutf" : "absolutf2"}>
                    <label for='password' style={{ color: "#f0f0f0" }}>Passwort: </label>
                    {!eye ? <div className="input-group "><input data-tip data-class="tt1" data-for="pass-tooltip" id='password' type="password" className={signUp ? (passwordtest ? "input-group-field inputl pwt" : "input-group-field inputl pwt2") : "input-group-field inputl"} onChange={setPwHandler}></input><div className="input-group-label eyediv" value={password}><IoMdEye className="eye" onClick={setEyeHandler} /></div></div> : <div className="input-group"><input id='password' data-tip data-class="tt1" data-for="pass-tooltip" type="text" className="input-group-field inputl" onChange={setPwHandler}></input><div className="input-group-label eyediv"><IoMdEyeOff className="eye" onClick={setEyeHandler} value={password} /></div></div>}
                    {signUp && passwordtest && <ReactTooltip id="pass-tooltip" >Passwörter müssen verdichtet sein!</ReactTooltip>}
                </div>
                <br /><br /><br />
                {signUp && (!eye2 ? <div className={signUp ? "absolutf" : "absolutf2"}><label for='password2' style={{ color: "#f0f0f0" }}>Passwort bestätigen: </label><div className="input-group "><input id='password2' type="password" className="input-group-field inputl" onChange={(event) => setPw2Handler(event.target.value)}></input><div className="input-group-label eyediv"><IoMdEye className="eye" onClick={() => setEye2Handler()} /></div></div></div> : <div className={signUp ? "absolutf" : "absolutf2"}><label for='password2' style={{ color: "#f0f0f0" }}>Passwort bestätigen:</label><div className="input-group"><input id='password2' type="text" className="input-group-field inputl" onChange={(event) => setPw2Handler(event.target.value)}></input><div className="input-group-label eyediv"><IoMdEyeOff className="eye" onClick={() => setEye2Handler()} /></div></div></div>)}
                {signUp && <div><br /><br /><br /></div>}
                {signUp &&
                    <div className="usergrButtonWrapper" onWheel={e=>wheelHandler(e)}>
                        <label className={usergr == "adm" ? "usergrButtonActive" : "usergrButton"} onClick={() => setUsergr("adm")} title="Administrator">A</label>
                        <label className={usergr == "par" ? "usergrButtonActive" : "usergrButton"} onClick={() => setUsergr("par")} title="Schüler">S</label>
                        <label className={usergr == "doz" ? "usergrButtonActive" : "usergrButton"} onClick={() => setUsergr("doz")} title="Dozent">D</label>
                        <label className={usergr == "coo" ? "usergrButtonActive" : "usergrButton"} onClick={() => setUsergr("coo")} title="Küche">K</label>
                    </div>
                }
                {signUp && <div><br /><br/></div>}
                <div className={signUp ? "absolutf" : "absolutf2"}>
                    <div className="input-group">
                        {!signUp && <label id='signin' className="input-group-label inputb" onClick={signInHandler}><a href="#"><IoIosCheckmark className="buttonicon" /></a>Sign In</label>}
                        {!signUp && <label id='signup' className="input-group-label inputb2" onClick={signUpHandler}><IoIosArrowRoundForward className="buttonicon2" />Sign Up</label>}
                        {signUp && <label id='signin' className="input-group-label inputb2" onClick={signInHandler}><a href="#"><IoIosArrowRoundForward className="buttonicon2" /></a>Zurück</label>}
                        {signUp && <label id='signup' className="input-group-label inputb" onClick={signUpHandler}><IoIosCheckmark className="buttonicon" />Sign Up</label>}
                    </div>
                </div>
            </div>
        )
    } else {
        // document.getElementById("app").className = "app"
        // document.getElementById("footer").className = ""
        return null
    }
}

export default Login