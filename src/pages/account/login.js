import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";
import { useHistory } from 'react-router-dom';

const login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const history = useHistory();
    const onSubmit = data => {
        apiClient.post(`/v1/auth/login`, data)
            .then(res => {
                // console.log(res);
                localStorage.setItem('token', res.data.token);
                setTimeout(function () {
                    window.location.reload();
                }, 5000);
                history.push('/cart');
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={"Pages"} title={"Login"} />
            </section>
            {/*hero section end*/}
            {/*body content start*/}
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
                                            {/* <div className="remember-checkbox d-flex align-items-center justify-content-between">
                                                <div className="checkbox">
                                                    <input type="checkbox" id="check2" name="check2" />
                                                    <label htmlFor="check2">Remember me</label>
                                                </div>
                                                <Link to="/forgot-password">Forgot Password?</Link>
                                            </div> */}
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
            {/*body content end*/}
        </>
    )
}

export default login