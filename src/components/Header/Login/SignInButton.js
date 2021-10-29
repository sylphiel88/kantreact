import React from "react";
import { IoIosCheckmark,IoIosArrowRoundForward  } from "react-icons/io"

function SignInButton(props) {
    return (
        <div>
            {!props.signUp ?
                <label id='signin' className="inputb" onClick={props.signInHandler}>
                    <IoIosCheckmark className="buttonicon" />Sign In
                </label>
            :
                <label id='signin' className="inputb2" onClick={props.signInHandler}>
                    <IoIosArrowRoundForward className="buttonicon2" />Zurück
                </label>
            }
        </div>
    )
}

export default SignInButton