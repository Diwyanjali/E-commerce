import { AiFillLock } from "react-icons/ai";
import { useState } from "react";
import Swal from "sweetalert2";
import './Forgotpass.css'
import { useParams } from "react-router-dom";

const Checkcode = () => {

    const { id } = useParams('')

    const [code, setCode] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        const random = localStorage.getItem('random')

        if (code === random) {
            Swal.fire({
                icon: 'success',
                title: 'code verified successfully',
            }).then((res) => {
                if(res.isConfirmed){
                    window.location.href = `/changepassword/${id}`
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'please insert correct code',
            }).then((res) => {
                if(res.isConfirmed){
                    window.location.reload();
                }
            })
        }

    }

    const handleChange = (e) => {
        setCode(e.target.value);

    }




    return (
        <div id='forgotpass-main'>

            <div className="forgot-box">

                <div className="head-forgot">
                    <h2>verify code</h2>
                    <div className="underline" style={{ width: "200px" }}></div>
                </div>

                <div className="box-form">


                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <div className="input">
                                <AiFillLock size={20} className="input-icon" />

                                <input
                                    type="number"
                                    placeholder="Enter verification code"
                                    name="code"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>



                        <div className="submit-container">

                            <input type="submit" className="submit" value="VERIFY" />


                        </div>
                    </form>


                </div>

            </div>

        </div>
    )
}

export default Checkcode