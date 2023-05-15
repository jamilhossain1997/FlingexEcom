import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { useForm } from "react-hook-form";
import apiClient from '../../../api/http-common';
import Pageheading from '../../../widgets/pageheading';
import UserMenu from '../User/UserMenu';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const userProfile = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/customer/info`)
            .then(res => {
                console.log(res.data);
                reset({
                    f_name: res.data.f_name,
                    l_name: res.data.l_name,
                    email: res.data.email,
                    phone: res.data.phone,
                    password: res.data.password
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const onSubmit = data => {
        apiClient.put(`/v1/customer/update-profile`, data)
            .then(res => {
                console.log(res);

                history.push('/userProfile');
                // alert(res.data.message)
                toast.success(res.data.message)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <ToastContainer autoClose={5000} />
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={"User"} title={"My Profile"} />
            </section>
            {/*hero section end*/}
            {/*body content start*/}

            <div className="page-content">
                {/*login start*/}
                <section className="register">
                    <Container>
                        <Row>
                            <Col lg={4} md={4} className="ml-auto mr-auto">
                                <UserMenu />
                            </Col>
                            <Col lg={6} md={6} className="ml-auto mr-auto">
                                <div className="shadow p-sm-4 p-2 bg-white mb-2">
                                    <div className="register-form text-center">
                                        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="messages" />
                                            <Row>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <input id="form_name" type="text" {...register("f_name")} className="form-control" placeholder="First name" required="required" data-error="Firstname is required." />
                                                        <div className="help-block with-errors" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <input id="form_lastname" type="text" {...register("l_name")} className="form-control" placeholder="Last name" required="required" data-error="Lastname is required." />
                                                        <div className="help-block with-errors" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <input id="form_email" type="email" {...register("email")} className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
                                                        <div className="help-block with-errors" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <input id="form_phone" type="tel" name="phone" {...register("phone")} className="form-control" placeholder="Phone" required="required" data-error="Phone is required" />
                                                        <div className="help-block with-errors" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <input id="form_password" type="password" {...register("password")} name="password" className="form-control" placeholder="Password" required="required" data-error="password is required." />
                                                        <div className="help-block with-errors" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="form-group">
                                                        <input id="form_password1" type="password" name="password" className="form-control" placeholder="Conform Password" required="required" data-error="Conform Password is required." />
                                                        <div className="help-block with-errors" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    {/* <Button variant="danger">Account Delect</Button> */}
                                                </Col>
                                                <Col md={12}>
                                                    <input type="submit" className="btn btn-primary" style={{ float: `left` }} />
                                                </Col>
                                            </Row>
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/*login end*/}
            </div>


            {/*body content end*/}
        </>
    );
}

export default userProfile