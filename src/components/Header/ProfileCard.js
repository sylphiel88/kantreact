import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoIosColorWand } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ProfilePicChooser from "./ProfilePicChooser"

function ProfileCard(props) {
    const [open, setOpen] = useState(false)
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

    useEffect(()=> {
        props.reloadHandler()
    },[img])

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

    function setOpenHandler(){
        if(open){
            document.getElementById("ppc").classList.replace("profilePicChooser","profilePicChooser_2")
            setTimeout(()=>{setOpen(false)},1000)
        } else {
            setOpen(true)
        }
    }

    return (
        <div style={{zIndex:"12"}}>
            <div className="card profileCard">
                <div className="profileHeader"><img src={img} alt="" className="profileLogo" onMouseEnter={mouseEHandler} onMouseLeave={mouseLHandler} onClick={setOpenHandler} /><div>{mouse && <IoIosColorWand className="profileIcon" />}</div><div className="profileUserText"><span className="profileUsername">{props.user}</span><span className="profileUsergroup">{props.usergr}</span></div></div>
                <div className="card-section">
                    <p><MdAlternateEmail className="emailIcon" />{props.userEmail}</p>
                </div>
                <div className="profileButtonWrapper">
                    <label className="profileButton" onClick={props.handler}><span className="profileButtonText">Schließen</span></label>
                    <label className="profileButton" onClick={props.logOutHandler}><span className="profileButtonText">LogOut</span></label>
                </div>
                {/* <input type="file" onChange={fileHandler} id="filename"></input> */}
            </div>
            {open && <ProfilePicChooser setImg={setImg} setOpen={setOpen} user={props.user}/>}
        </div>
    )
}

export default ProfileCard
