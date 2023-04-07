import axios from 'axios';
import React, { useState } from 'react';
import '../../css/uploadAvatar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadAvatar = () => {
    const [pic, setPic] = useState(null);

    const uploadPic = async () => {
        const formData = new FormData();
        formData.append("profile-image", pic);
        try {
            const { data } = await axios.post(
                "http://kzico.runflare.run/user/profile-image",
                formData,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                }
            );
            toast(`${data.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "success"
            })
        }
        catch (error) {
            toast(`${error.response.data.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "error"
            })
        }
    }
    return (
        <div className="uploadavatar">
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}>
                <p>Upload your avatar</p>
                <label for="avatar">Your avatar</label>
                <input type="file" name="avatar" id="avatar"
                    onChange={(e) => setPic(e.target.files[0])}
                />
                <button type="submit"
                    onClick={uploadPic}
                >Upload</button>
            </form>
        </div>

    )
}
export default UploadAvatar;