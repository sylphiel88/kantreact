import React from "react"
import ReactTooltip from 'react-tooltip'

function EmailFeld(props) {
    return (
        <div >
            <div>
                <div className={props.signUp ? "absolutf" : "absolutf2"}>
                    <label for='email' style={{ color: "#f0f0f0" }}>Email: </label>
                    <div data-tip data-class="tt" data-for="email-tooltip">
                        <input id='email' type="text" className={props.emailtest ? "inputl pwt" : "inputl pwt2"} onChange={(event) => props.setEmHandler(event.target.value)}></input>
                    </div>
                </div>
                <br /><br /><br />
            </div>
            {props.signUp && props.emailtest && <ReactTooltip id="email-tooltip" >Keine Valide Email!</ReactTooltip>}
        </div>
    )
}

export default EmailFeld