import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


const singup = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const history = useHistory();
  const onSubmit = data => {
    apiClient.post(`/v1/auth/register`, data)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        history.push('/');
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
        <Pageheading foldername={"Pages"} title={"Sign Up"} />
      </section>
      {/*hero section end*/}
      {/*body content start*/}
      <div className="page-content">
        {/*login start*/}
        <section className="register">
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={8} md={12}>
                <div className="mb-6">
                  <h6 className="text-primary mb-1">
                    — Sign Up
                  </h6>
                  <h2>Simple And Easy To Sign Up</h2>
                  {/* <p className="lead">We use the latest technologies it voluptatem accusantium doloremque laudantium, totam rem aperiam.</p> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={8} md={10} className="ml-auto mr-auto">
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
                    </Row>

                    {/* <Row className="mt-5">
                      <Col md={12}>
                        <div className="remember-checkbox clearfix mb-5">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">I agree to the term of use and privacy policy</label>
                          </div>
                        </div>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md={12}>
                        <input type="submit" className="btn btn-primary" />
                        <span className="mt-4 d-block">Have An Account ?  <Link to="/sign-in"><i>Sign In!</i></Link></span>
                      </Col>
                    </Row>
                  </form>
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

export default singup