import axios from 'axios';
import React, { useState } from 'react';
import '../../css/changePassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState({
    value: '',
    isTouched: 'false',
    error: 'Password is not valid',
    isValid: 'false'
  });
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const changePass = async () => {
    if(newPassword.isValid && oldPassword.length && newPassword.value.length){
      try {
        const { data } = await axios.put(
          "http://kzico.runflare.run/user/change-password",
          {
            old_password: oldPassword,
            new_password: newPassword.value
          },
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
      } catch (error) {
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
  }
  return (
    <div className="changePass">
      <ToastContainer />
      <form onSubmit={(e) => e.preventDefault()}>
        <p>Change your password</p>
        <label for="oldPass">Old password</label>
        <input type="password" name="oldPass" id="oldPass"
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
        />
        <label for="newPass">New password</label>
        <input type="password" name="newPass" id="newPass"
          onChange={(e) => setNewPassword(last => { return { ...last, value: e.target.value } })}
          value={newPassword.value}
          onBlur={
            () => setNewPassword((last) => {
              return { ...last, isTouched: true, isValid: passwordRegex.test(last.value) }
            })
          }
        />
        {!newPassword.isValid && newPassword.isTouched && <p style={{ color: '#EA1B25' }}>{newPassword.error}</p>}
        <button type="submit" onClick={changePass}>Done</button>
      </form>
    </div>

  )
}
export default ChangePassword;