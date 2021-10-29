import React from "react";
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import ReactTooltip from 'react-tooltip'

function PasswortFeld(props) {
    return (
        <div>
            <div className={props.signUp ? "absolutf" : "absolutf2"}>
                <label for={props.idp} style={{ color: "#f0f0f0" }}>{props.idp=="password"?"Passwort: ":"Passwort bestätigen: "} </label>

                <div className="input-group ">
                    <input data-tip data-class="tt1" data-for="pass-tooltip" id={props.idp} type={props.eye?"text":"password"} className={props.signUp ? (props.passwordtest ? "input-group-field inputl pwt" : "input-group-field inputl pwt2") : "input-group-field inputl"} onChange={props.setPwHandler}></input>
                    <div className="input-group-label eyediv" value={props.password}>
                        {props.eye?
                        <IoMdEyeOff className="eye" onClick={props.setEyeHandler} />
                        :
                        <IoMdEye className="eye" onClick={props.setEyeHandler} />
                        }
                        </div>
                </div>

               {/* signUp, password, eye, passworttest setEyeHandler setPwHandler */}
                {props.signUp && props.passwordtest && <ReactTooltip id="pass-tooltip" >Passwörter müssen verdichtet sein!</ReactTooltip>}
            </div>
        </div>
    )
}

export default PasswortFeld