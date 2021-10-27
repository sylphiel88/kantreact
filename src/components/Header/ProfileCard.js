import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoIosColorWand } from "react-icons/io";

function ProfileCard(props) {
    const [open, setOpen] = useState(true)
    const [img, setImg] = useState(null)
    const [mouse, setMouse] = useState(false)

    useEffect(() => {
        if (img == null) {
            fetch('http://localhost:5000/api/v1/user/getProfilePic?username=' + props.user)
                .then((res) => res.json())
                .then((data) => {
                    if (data.noPic === true) {
                        setImg(require('../../Image/LeeresProfilbild.jpg').default)
                    } else {
                        var base64Flag = 'data:image/jpeg;base64,';
                        var imageStr = arrayBufferToBase64(data.img.data.data);
                        setImg(base64Flag + imageStr)
                    }
                })
        }
    })

    function mouseEHandler() {
        setMouse(true)
    }

    function mouseLHandler() {
        setMouse(false)
    }

    async function fileHandler() {
        const file = document.getElementById("filename").value
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        const formData = new FormData();
        console.log();
        formData.append(
            'filename',
            document.getElementById("filename").files[0]
        );
        formData.append(
            'username', props.user
        )
        console.log(formData);
        const res = await axios.post('http://localhost:5000/api/v1/user/uploadProfilepic', formData, config);
        console.log(res.data.img)
        setImg(null)
    }

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    return (
        <div className="profileCard">
            {open && <div>
                <div class="card" style={{ backgroundColor: "#3a5379", border: "none", color: "rgb(255, 251, 224)" }}>
                    <div className="profileHeader"><img src={img} className="profileLogo" onMouseEnter={mouseEHandler} onMouseLeave={mouseLHandler} /><div>{mouse && <IoIosColorWand className="profileIcon" />}</div><div className="profileUserText"><span className="profileUsername">{props.user}</span><span className="profileUsergroup">{props.usergr}</span></div></div>
                    <div class="card-section">
                        <p>This is a simple card with an image.</p>
                    </div>
                    <label style={{ width: "100px", height: "30px", backgroundColor: "#FF0000" }} onClick={props.handler}>Schließen</label>
                    <label style={{ width: "100px", height: "30px", backgroundColor: "#FF0000" }} onClick={props.logOutHandler}>LogOut</label>
                    <input type="file" onChange={fileHandler} id="filename"></input>
                </div>
            </div>}
        </div>
    )
}

export default ProfileCard

