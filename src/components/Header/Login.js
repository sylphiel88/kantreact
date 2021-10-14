import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import React from "react"
import { IoIosArrowRoundForward, IoIosCheckmark } from "react-icons/io"
import ReactTooltip from 'react-tooltip'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.wrapperRef = React.createRef()
        this.state = {  open: true,
                        eye: false,
                        eye2: false,
                        signUp: false,
                        username: "",
                        password: "",
                        antwort: "",
                        email: "",
                        passwordc: "",
                        passwordtest: true,
                        emailtest: true,
                        msg: "",
                        signInloaded: false,
                        token: ""
                        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        // this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setEye = this.setEye.bind(this)
        this.setEye2 = this.setEye2.bind(this)
        this.signUp = this.setSignUp.bind(this)
        this.signIn = this.setSignIn.bind(this)
        this.setPw = this.setPw.bind(this)
        this.setPw2 = this.setPw2.bind(this)
        this.setUn = this.setUn.bind(this)
        this.setEm = this.setEm.bind(this)
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    async setWrapperRef(node) {
        this.wrapperRef = node;
    }

    async setEye() {
        await this.setState({ eye: !this.state.eye })
    }

    async setEye2() {
        await this.setState({ eye2: !this.state.eye2 })
    }

    async setPw(pw) {
        var noCo = false
        // var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        // if(!re.test(this.state.password)){
        //     var noCo = true
        // } else {
        //     var noCo = false
        // }
        await this.setState({ password: pw, passwordtest: noCo })
    }

    async setPw2(pw) {
        await this.setState({ passwordc: pw })
    }

    async setUn(un) {
        await this.setState({ username: un })
    }

    async setEm(em) {
       // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({emailtest: false})
            // if (!re.test(this.state.email)) {
            //     await this.setState({emailtest: true})
            // } else {
            //     await this.setState({emailtest: false})
            // }
        await this.setState({ email: em })
        
    }

    async setSignUp() {
        if (this.state.signUp == false) {
            await this.setState({ password: "", username: "",eye: false, eye2: false, signUp: !this.state.signUp, signInloaded: true})
        } else {
            if (this.state.username.length < 3) {
                var noUn = true
                console.log("Username must be 3 Chars or longer")
            }
            if (this.state.password.length < 3) {
                var noPw = true
                console.log("Password must be 3 Chars or longer")
            }
            if (this.state.passwordc.length < 3) {
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
            if(this.state.password!=this.state.passwordc){
                var noMa = true
                console.log("Passwords are different")
            }
            if (!(noUn || noPw || noPw2 || noEm || noMa || noCo )) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: this.state.username,  
                        password: this.state.password,
                        email: this.state.email
                    })
                };
                await fetch('http://localhost:5000/api/v1/user/signup', requestOptions)
                    .then(response => response.json())
                    .then(data => this.setState({ msg: data.message }))
                await this.setState({open: false})
                await this.props.handler()
            }
        }
    }


    async setSignIn() {
        if (this.state.signUp == true) {
            this.setState({ signUp: !this.state.signUp, password: "", username: "",eye: false, eye2: false})
        } else {
            if (this.state.username.length < 3) {
                var noUn = true
                console.log("Username must be 3 Chars or longer")
            }
            if (this.state.password.length < 3) {
                var noPw = true
                console.log("Password must be 3 Chars or longer")
            }
            if (!(noUn || noPw)) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password
                    })
                };
                await fetch('http://localhost:5000/api/v1/user/signin', requestOptions)
                    .then(response => response.json())
                    .then(data => this.setState({ msg: data.message, token: data.authorization, login: data.login, un: data.user }));
                localStorage.setItem('authorization', this.state.token);
                await this.setState({open: false})
                await this.props.handler()
                window.location.href="/"
            }
        }
    }


    changeOpen = () => {
        if (this.state.open == this.props.stateo) {
            this.setState({ open: !this.state.open })
            this.props.handler()
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef) {
            if ((event.clientX < 710 || event.clientX > 1150 || event.clientY < 260 || event.clientY > 800) && (event.clientX < 1800 && event.clientY > 50)) {
                this.changeOpen()
            }
        }
    }
    render() {
        let text = "";
        let button1 = "";
        let button2 = "";
        let email = "";
        let pwconfirm = "";
        let br="";
        let classes ="";
        if (this.state.open == true) {
            if (this.state.passwordtest){
                classes="input-group-field inputl pwt"
            } else {
                classes="input-group-field inputl pwt2"
            }
            if (!this.state.eye) {
                text = <div className="input-group "><input data-tip data-class="tt1" data-for="pass-tooltip" id='password' type="password" className={this.state.signUp?classes:"input-group-field inputl"} onChange={(event) => this.setPw(event.target.value)}></input><div className="input-group-label eyediv"><IoMdEye className="eye" onClick={() => this.setEye()} /></div></div>
            } else {
                text = <div className="input-group"><input id='password' data-tip data-class="tt1" data-for="pass-tooltip" type="text" className="input-group-field inputl" onChange={(event) => this.setPw(event.target.value)}></input><div className="input-group-label eyediv"><IoMdEyeOff className="eye" onClick={() => this.setEye()} /></div></div>
            }
            if (this.state.signUp == false) {
                button1 = <label id='signin' className="input-group-label inputb" onClick={() => this.signIn()}><a href="#"><IoIosCheckmark className="buttonicon"/></a>Sign In</label>
                button2 = <label id='signup' className="input-group-label inputb2" onClick={() => this.signUp()}><IoIosArrowRoundForward className="buttonicon2"/>Sign Up</label>
            } else {
                button1 = <label id='signin' className="input-group-label inputb2" onClick={() => this.signIn()}><a href="#"><IoIosArrowRoundForward className="buttonicon2"/></a>Zurück</label>
                button2 = <label id='signup' className="input-group-label inputb" onClick={() => this.signUp()}><IoIosCheckmark className="buttonicon"/>Sign Up</label>
                email = <div>
                            <div className={this.state.signUp?"absolutf":"absolutf2"}>
                                <label for='email' style={{ color: "#f0f0f0" }}>Email: </label>
                                <div data-tip data-class="tt" data-for="email-tooltip"><input id='email' type="text" className={this.state.emailtest?"inputl pwt":"inputl pwt2"} onChange={(event) => this.setEm(event.target.value)}></input></div>
                            </div>
                            <br /><br /><br />
                        </div>
                if (!this.state.eye2) {
                    pwconfirm = <div className={this.state.signUp?"absolutf":"absolutf2"}><label for='password2' style={{ color: "#f0f0f0" }}>Passwort bestätigen: </label><div className="input-group "><input id='password2' type="password" className="input-group-field inputl" onChange={(event) => this.setPw2(event.target.value)}></input><div className="input-group-label eyediv"><IoMdEye className="eye" onClick={() => this.setEye2()} /></div></div></div>
                } else {
                    pwconfirm = <div className={this.state.signUp?"absolutf":"absolutf2"}><label for='password2' style={{ color: "#f0f0f0" }}>Passwort bestätigen:</label><div className="input-group"><input id='password2' type="text" className="input-group-field inputl" onChange={(event) => this.setPw2(event.target.value)}></input><div className="input-group-label eyediv"><IoMdEyeOff className="eye" onClick={() => this.setEye2()} /></div></div></div>
                }
                br=<span><br/><br/><br/></span>    
            }
            let loginFeldClass=!this.state.signInloaded?"login-feld-signin":this.state.signUp?"login-feld-signup":"login-feld-signin-2";
            return (
                <div className={loginFeldClass} id="login-feld">
                    <div className={this.state.signUp?"absolutf":"absolutf2"}>
                        <label for='username' style={{ color: "#f0f0f0" }}>Nutzername: </label>
                        <input id='username' type="text" className="inputl" onChange={(event) => this.setUn(event.target.value)}></input>
                    </div>
                    <br /><br /><br />
                    {email}
                    {this.state.signUp && this.state.emailtest?<ReactTooltip id="email-tooltip" >Keine Valide Email!</ReactTooltip>:""}
                    <div className={this.state.signUp?"absolutf":"absolutf2"}>
                        <label for='password' style={{ color: "#f0f0f0" }}>Passwort: </label>
                        {text}
                        {this.state.signUp && this.state.passwordtest?<ReactTooltip id="pass-tooltip" >Passwörter müssen verdichtet sein!</ReactTooltip>:""}
                    </div>
                    <br /><br /><br />
                    {pwconfirm}
                    {br}
                    <div className={this.state.signUp?"absolutf":"absolutf2"}>
                        <div className="input-group">
                            {button1}
                            {button2}
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
}