import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../css/changeProfile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangeProfile = () => {
    const [gender, setGender] = useState("");
    const [emptyGn , setEmptyGn]=useState(false);
    const [firstName , setFirstName]=useState({
        isValid:false,
        value:'',
        isTouched:false,
        error:'first name must be at least 3 characters'
    })
    const [lastName , setLastName]=useState({
        isValid:false,
        value:'',
        isTouched:false,
        error:'last name must be at least 3 characters'
    })
    const [age , setAge]=useState({
        isValid:false,
        value:'',
        isTouched:false,
        error:'age must be greater than 15'
    })
    const [city , setCity]=useState({
        isValid:false,
        value:'',
        isTouched:false,
        error:'last name must be at least 3 characters'
    })

    const submitChangeProfile = async () => {
        if(!gender.length){
            setEmptyGn(true);
        }
        if(firstName.isValid && lastName.isValid && age.isValid && city.isValid && gender.length
            && firstName.value.length && lastName.value.length && age.value.length && city.value.length
            ){
            try {
                const { data } = await axios.put(
                    "http://kzico.runflare.run/user/change-profile",
                    {
                        firstname: firstName.value,
                        lastname: lastName.value,
                        gender: gender,
                        age: age.value,
                        city: city.value
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
            setEmptyGn(false);
        }
    }
    return (
        <div className="changprof">
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}>
                <p>Account details</p>
                <label for="fnam">First name</label>
                <input type="text" name="fnam" id='fnam'
                    onChange={(e) => setFirstName(last => { return { ...last, value: e.target.value } })}
                    value={firstName.value}
                    onBlur={
                        () => setFirstName((last) => {
                            return { ...last, isTouched: true, isValid: last.value?.trim().length >= 3 }
                        })
                    }
                    onFocus={()=>{
                        setFirstName((last)=>{
                            return {...last,isTouched:false}
                        })
                    }}
                />
                {!firstName.isValid && firstName.isTouched && <p style={{ color: '#EA1B25' }}>{firstName.error}</p>}
                <label for="lnam">Last name</label>
                <input type="text" name="lnam" id='lnam'
                    onChange={(e) => setLastName(last => { return { ...last, value: e.target.value } })}
                    value={lastName.value}
                    onBlur={
                        () => setLastName((last) => {
                            return { ...last, isTouched: true, isValid: last.value?.trim().length >= 3 }
                        })
                    }
                    onFocus={()=>{
                        setLastName((last)=>{
                            return {...last,isTouched:false}
                        })
                    }}
                />
                {!lastName.isValid && lastName.isTouched && <p style={{ color: '#EA1B25' }}>{lastName.error}</p>}
                <label for="age">Age</label>
                <input type="number" name="age" min="15" max="120" id='age'
                    onChange={(e) => setAge(last => { return { ...last, value: e.target.value } })}
                    value={age.value}
                    onBlur={
                        () => setAge((last) => {
                            return { ...last, isTouched: true, isValid: last.value >= 15 }
                        })
                    }
                    onFocus={()=>{
                        setAge((last)=>{
                            return {...last,isTouched:false}
                        })
                    }}
                />
                {!age.isValid && age.isTouched && <p style={{ color: '#EA1B25' }}>{age.error}</p>}

                <label for="city">City</label>
                <input type="text" name="city" id='city'
                    onChange={(e) => setCity(last => { return { ...last, value: e.target.value } })}
                    value={city.value}
                    onBlur={
                        () => setCity((last) => {
                            return { ...last, isTouched: true, isValid: last.value?.trim().length >= 3 }
                        })
                    }
                    onFocus={()=>{
                        setCity((last)=>{
                            return {...last,isTouched:false}
                        })
                    }}
                />
                {!city.isValid && city.isTouched && <p style={{ color: '#EA1B25' }}>{city.error}</p>}
                <Container>
                    <Row>
                        <Col sm='2'>
                            <label className='gender' for="female">Female</label>
                            <input className='gender' type="radio" name='gender'
                                onChange={(e) => setGender(e.target.value)}
                                value='female'
                            />
                        </Col>
                        <Col sm='2'>
                            <label className='gender' for="male">Male</label>
                            <input className='gender' type="radio" name='gender'
                                onChange={(e) => setGender(e.target.value)}
                                value='male'
                            />
                        </Col>
                    </Row>
                    
                {emptyGn && <p style={{ color: '#EA1B25' }}>please fill in gender</p>}
                </Container>
                <button type="submit"
                    onClick={submitChangeProfile}
                >Done</button>
            </form>
        </div>

    )
}
export default ChangeProfile;