import React from "react";
import axios from "axios";

function ProfilePicChooser(props){

    async function fileHandler() {
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
        const res = await axios.post('http://localhost:5000/api/v1/user/uploadProfilepic', formData, config)
        document.getElementById("ppc").classList.replace("profilePicChooser","profilePicChooser_2")
        props.setImg(null)
        setTimeout(function() {props.setOpen(false)},1000)
    }

    async function deleteProfilePic(){
        const res = await axios.get('http://localhost:5000/api/v1/user/deleteProfilepic?username='+props.user)
        document.getElementById("ppc").classList.replace("profilePicChooser","profilePicChooser_2")
        props.setImg(null)
        setTimeout(function() {props.setOpen(false)},1000)
    }

    return(
        <div className="profilePicChooser" id="ppc">
            <label htmlFor="filename" className="fileChooser">Profilbild ändern</label>
            <input type="file" onChange={fileHandler} id="filename"></input>
            <label className="fileChooser" onClick={deleteProfilePic}>Profilbild löschen</label>
        </div>
    )
}

export default ProfilePicChooser