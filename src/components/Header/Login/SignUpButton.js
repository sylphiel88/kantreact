import React from "react";
import { IoIosCheckmark,IoIosArrowRoundForward   } from "react-icons/io"

function SignUpButton(props){
    return(
        <div>
            {!props.signUp ?
                <label id='signup' className="input-group-label inputb2" onClick={props.signUpHandler}>
                    <IoIosArrowRoundForward className="buttonicon2" />Sign Up
                </label>
            :
                <label id='signup' className="input-group-label inputb" onClick={props.signUpHandler}>
                    <IoIosCheckmark className="buttonicon" />Sign Up
                </label>
            }
        </div>
    )
}

export default SignUpButton