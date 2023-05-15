import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import apiClient from '../../../api/http-common';


const otpLogin = () => {

    const [sendOtp, setSendOtp] = useState('');
    const history = useHistory();
    const onSubmit = () => {
        apiClient.post(`/v1/auth/sendOtp?phone=${sendOtp}`)
            .then(res => {
                // localStorage.setItem('token', res.data.token);
                history.push('/Otpset');
                toast.success(res.data.messages);
                // history.goBack();

            })
            .catch(err => {
                // console.log(err);
                // toast.warning(err.data.messages);
            })
    }

    return (
        <>
            <>
                {/*hero section start*/}
                {/* <section className="bg-light">
                    <Pageheading foldername={"Pages"} title={"Forgot Password"} />
                </section> */}
                {/*hero section end*/}
                {/*body content start*/}
                <div className="page-content">
                    {/*login start*/}
                    <section>
                        <Container>
                            <Row className="justify-content-center">
                                <div className="col-5">
                                    <div>
                                        <div className="text-center mb-5">
                                            <h2>OTP LOGIN</h2>
                                            {/* <p>Enter your Phone.</p> */}
                                        </div>
                                        <form id="contact-form">
                                            <div className="messages" />
                                            <div className="form-group">
                                                <label>Mobile Number</label>
                                                <input id="form_email" type="number" value={sendOtp} onChange={(e) => setSendOtp(e.target.value)} className="form-control" placeholder="Enter your Phone" required="required" data-error="Valid email is required." />
                                                <div className="help-block with-errors" />
                                            </div>
                                            <Link to="#" className="btn btn-info btn-animated btn-block bg-info" onClick={onSubmit}>SEND OTP</Link>
                                        </form>
                                        <div className="mt-4 text-center">
                                            <Link className="btn-link" to="/sign-in">Back to Email Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </section>
                    {/*login end*/}
                </div>
                {/*body content end*/}
            </>
        </>
    )
}

export default otpLogin
