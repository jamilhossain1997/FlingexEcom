import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const history = useHistory();
    const onSubmit = data => {
        apiClient.post(`/v1/auth/login`, data)

            .then(res => {
                // console.log(res);
                localStorage.setItem('token', res.data.token);
                const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds
                localStorage.setItem('expirationTime', expirationTime);
                setTimeout(function () {
                    window.location.reload()
                }, 100);
                history.push('/OneStepCheck');
                // history.goBack();
            })
            .catch(err => {
                console.log(err);
                toast.warning("plz right email & Password");
            });

    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HelmetProvider>
                <ToastContainer autoClose={5000} />
                <Helmet>
                    <meta http-equiv='cache-control' content='no-cache' />
                    <meta http-equiv='expires' content='0' />
                    <meta http-equiv='pragma' content='no-cache' />
                </Helmet>
                <div className="page-content">
                    {/*login start*/}
                    <section>
                        <Container>
                            <Row className="justify-content-center">
                                <div className="col-lg-5">
                                    <div className="shadow p-3">
                                        <img className="img-fluid mb-5" src={require(`../../assets/images/login.png`).default} alt="" />
                                        <h3 className="text-center mb-3 text-uppercase">User Login</h3>
                                        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="messages" />
                                            <div className="form-group">
                                                <input id="form_name" type="text" {...register("email")} className="form-control" placeholder="User name" required="required" data-error="Username is required." />
                                                <div className="help-block with-errors" />
                                            </div>
                                            <div className="form-group">
                                                <input id="form_password" type="password" {...register("password")} className="form-control" placeholder="Password" required="required" data-error="password is required." />
                                                <div className="help-block with-errors" />
                                            </div>
                                            <div className="form-group mt-4 mb-5">
                                            </div> <a href='/cart'><input type="submit" className="btn btn-primary btn-block" /></a>
                                        </form>
                                        <div className="d-flex align-items-center text-center justify-content-center mt-4">
                                            <span className="text-muted mr-1">Don't have an account?</span>
                                            <Link to="/sign-up">Sign Up</Link>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </section>
                    {/*login end*/}
                </div>
            </HelmetProvider>
            {/*body content end*/}
        </>
    )
}

export default login