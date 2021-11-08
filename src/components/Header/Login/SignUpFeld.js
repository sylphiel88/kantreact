import React from "react"
import UsernameFeld from "./UsernameFeld"
import EmptyLine from "./EmptyLine"
import EmailFeld from "./EmailFeld"
import PasswortFeld from "./PasswortFeld"
import UserGroupButtonWrapper from "./UserGroupButtonWrapper"
import UserGroupButton from "./UserGroupButton"
import LoginButtonWrapper from "./LoginButtonWrapper"
import SignInButton from "./SignInButton"
import SignUpButton from "./SignUpButton"
import DepSelector from "./DepSelector"

function SignUpFeld(props) {
    return (
        <div>
            <UsernameFeld signUp={true} setUnHandler={props.setUnHandler} username={props.username} />
            <EmptyLine />
            <EmailFeld signUp={true} setEmHandler={props.setEmHandler} emailtest={props.emailtest} />
            <PasswortFeld signUp={true} passwort={props.password} eye={props.eye} passworttest={props.passwordtest} setEyeHandler={props.setEyeHandler} setPwHandler={props.setPwHandler} idp="password" />
            <EmptyLine />
            <PasswortFeld signUp={true} passwort={props.passwordc} eye={props.eye2} passworttest={props.passwordtest} setEyeHandler={props.setEye2Handler} setPwHandler={props.setPw2Handler} idp="password2" />
            <EmptyLine />
            <UserGroupButtonWrapper wheelHandler={props.wheelHandler}>
                <UserGroupButton usergr={props.usergr} grpS="adm" grpL="Administrator" grpB="A" setUsergr={props.setUsergr} />
                <UserGroupButton usergr={props.usergr} grpS="par" grpL="Schüler" grpB="S" setUsergr={props.setUsergr} />
                <UserGroupButton usergr={props.usergr} grpS="doz" grpL="Dozent" grpB="D" setUsergr={props.setUsergr} />
                <UserGroupButton usergr={props.usergr} grpS="coo" grpL="Küche" grpB="K" setUsergr={props.setUsergr} />
            </UserGroupButtonWrapper>
            <EmptyLine/>
            {props.usergr=="doz"?<div><br/><DepSelector signUp={true} deps={props.deps} changeHandler={props.depSelHandler}/><EmptyLine/></div>:<div><EmptyLine/><br/></div>}
            <LoginButtonWrapper signUp={true}>
                <SignInButton signUp={true} signInHandler={props.signInHandler} />
                <SignUpButton signUp={true} signUpHandler={props.signUpHandler} />
            </LoginButtonWrapper>
        </div>
    )
}
export default SignUpFeld
