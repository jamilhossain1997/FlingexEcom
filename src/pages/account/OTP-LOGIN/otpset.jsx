import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import apiClient from '../../../api/http-common';

const otpset = () => {
    const [recivedotp, setRecivedotp] = useState('');
    const history = useHistory();
    const onSubmit = () => {
        apiClient.get(`/v1/auth/recivedotp?otp=${recivedotp}`)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
                localStorage.setItem('expirationTime', expirationTime);
                setTimeout(function () {
                    window.location.reload()
                }, 100);


                history.push('/OneStepCheck');
                toast.success(res.data.messages);
                // history.goBack();

            })
            .catch(err => {
                console.log(err);
                toast.warning("please correct otp write");
            });

    }

    return (
        <>

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
                                            <label>OTP</label>
                                            <input id="form_email" type="number" value={recivedotp} onChange={(e) => setRecivedotp(e.target.value)} className="form-control" placeholder="OTP" required="required" data-error="Valid email is required." />
                                            <div className="help-block with-errors" />
                                        </div>
                                        <Link to="#" className="btn btn-info btn-animated btn-block" onClick={onSubmit}>SEND OTP</Link>
                                    </form>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </section>
                {/*login end*/}
            </div>
            {/*body content end*/}

        </>
    )
}

export default otpset
