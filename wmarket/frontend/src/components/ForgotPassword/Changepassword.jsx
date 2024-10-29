import { AiOutlineSafety } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import './Forgotpass.css'
import { useParams } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";


const Changepassword = () => {

    const { id } = useParams('')



    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate === true) {
            axios.post('http://localhost:3000/forgot/changepass', {
                id: id,
                password: password
            }).then((res) => {
                console.log(res)

                Swal.fire({
                    icon: 'success',
                    title: 'Password reset successful',
                }).then((result) => {


                    if (result.isConfirmed) {
                        localStorage.removeItem('random');
                        window.location.href = "/login"


                    }
                })
            }).catch((err) => {
                console.log(err)
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The password must contain the given condition',
            })
        }



    }

    const handleChange = (e) => {


        const newPassword = e.target.value;
        setPassword(newPassword);

        const validation = validatePassword(newPassword);
        setValidationMessage(validation.message);
        setValidate(validation.valid);

    }


    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [validate, setValidate] = useState('');

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return { valid: false, message: 'Password must be at least 8 characters long.' };
        }
        if (!hasUpperCase) {
            return { valid: false, message: 'Password must contain at least one uppercase letter.' };
        }
        if (!hasLowerCase) {
            return { valid: false, message: 'Password must contain at least one lowercase letter.' };
        }
        if (!hasNumber) {
            return { valid: false, message: 'Password must contain at least one number.' };
        }
        if (!hasSpecialChar) {
            return { valid: false, message: 'Password must contain at least one special character.' };
        }

        return { valid: true, message: 'Password is valid.' };
    };

    const [see, SetSee] = useState('text');

    const seePasswords = () => {

        if (see === 'password') {
            SetSee('text')
        } else {
            SetSee('password')
        }

    }



    return (
        <div id='forgotpass-main'>

            <div className="forgot-box">

                <div className="head-forgot">
                    <h2>Change password</h2>
                    <div className="underline" style={{ width: "200px" }}></div>
                </div>

                <div className="box-form">


                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <p style={{ color: validationMessage === 'Password is valid.' ? 'green' : 'red' }}>
                                {validationMessage}
                            </p>
                            <div className="input">
                                <AiOutlineSafety size={20} className="input-icon" />

                                <input
                                    type={see}
                                    placeholder="Enter New Password"
                                    name="code"
                                    onChange={handleChange}
                                    required
                                />

                                {
                                    see === 'password' ? <>
                                        <AiFillEye size={20} className="input-icon" onClick={seePasswords} />
                                    </> :
                                        <>
                                            <AiFillEyeInvisible size={20} className="input-icon" onClick={seePasswords} />

                                        </>
                                }
                            </div>
                        </div>



                        <div className="submit-container">

                            <input type="submit" className="submit" value="UPDATE" />


                        </div>
                    </form>


                </div>

            </div>

        </div>
    )
}

export default Changepassword