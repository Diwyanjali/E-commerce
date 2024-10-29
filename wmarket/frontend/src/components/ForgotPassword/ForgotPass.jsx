import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import './Forgotpass.css'



const ForgotPass = () => {

    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');


    function generateSixDigitNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }


    const sendDataBAckend = (email, id, random) => {

        const data = {
            email: email,
            id: id,
            random: random
        }

        axios.post('http://localhost:3000/forgot/sendEmail', data).then((response) => {
            console.log(response.data);
        })

    }
    
   


    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post('http://localhost:3000/forgot/getUser', {
            email: email
        }).then((response) => {

            setUser(response.data[0])
            console.log(user);

            if (user) {
                Swal.fire({
                    icon: 'success',
                    title: 'Email has been sent',
                    text: 'Please check your email we have sent you a link and verification code to reset your password',
                }).then((result) => {

                   
                    if (result.isConfirmed) {
                        const randomNumber = generateSixDigitNumber();
                        localStorage.setItem('random', randomNumber);
                        sendDataBAckend(email, user.id, randomNumber);
                        window.location.href = "/";
                    }
                })
            } else if (response.data.message === "User not found") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'User not found',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            }


        })
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
    }


    return (


        <div id='forgotpass-main'>

            <div className="forgot-box">

                <div className="head-forgot">
                    <h2>Forgot password</h2>
                    <div className="underline" style={{ width: "200px" }}></div>
                </div>

                <div className="box-form">


                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <div className="input">
                                <FaUser size={20} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="Enter your Email"
                                    name="username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>



                        <div className="submit-container">

                            <input type="submit" className="submit" value=" SEND" />


                        </div>
                    </form>


                </div>

            </div>

        </div>
    )
}

export default ForgotPass