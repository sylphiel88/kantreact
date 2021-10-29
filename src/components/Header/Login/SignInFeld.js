import React from "react";
import UsernameFeld from "./UsernameFeld";
import EmptyLine from "./EmptyLine";
import PasswortFeld from "./PasswortFeld";
import LoginButtonWrapper from "./LoginButtonWrapper";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";


function SignInFeld(props) {
    return (
        <div>
            <UsernameFeld signUp={false} setUnHandler={props.setUnHandler} username={props.username} />
            <EmptyLine />
            <PasswortFeld signUp={false} passwort={props.password} eye={props.eye} passworttest={props.passwordtest} setEyeHandler={props.setEyeHandler} setPwHandler={props.setPwHandler} idp="password" />
            <EmptyLine/>
            <LoginButtonWrapper signUp={false}>
                <SignInButton signUp={false} signInHandler={props.signInHandler} />
                <SignUpButton signUp={false} signUpHandler={props.signUpHandler} />
            </LoginButtonWrapper>
        </div>
    )
}

export default SignInFeld