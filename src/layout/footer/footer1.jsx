import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { useEffect } from 'react';
import apiClient from '../../api/http-common';

const footer1 = () => {
    const [copyRight, setCopyRight] = useState([]);
    const [about, setAbout] = useState([]);
    const [email, setSetEmail] = useState([]);
    const [footerlogo, setFootlogo] = useState([]);
    const [comName, setComName] = useState([]);
    const [phone, setPhone] = useState([]);
    const [address, setAddress] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState([]);
    const [social, setSocial] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/categories`)
            .then(res => {
                setCategories(res.data);
            })
    }, []);

    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/brands`)
            .then(res => {
                setBrand(res.data);
            })
    }, []);



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        apiClient.get(`/v1/company-phone`)
            .then(res => {
                setPhone(res.data);
            })
        apiClient.get(`/v1/company-name`)
            .then(res => {
                setComName(res.data);
            })
        apiClient.get(`/v1/company-about`)
            .then(res => {
                setAbout(res.data);
            })
        apiClient.get(`/v1/company-email`)
            .then(res => {
                setSetEmail(res.data);
            })
        apiClient.get(`/v1/company-footer-logo`)
            .then(res => {
                setFootlogo(res.data);
            })
        apiClient.get(`/v1/company-copyright-text`)
            .then(res => {
                setCopyRight(res.data);
            })

        apiClient.get(`/v1/company-address`)
            .then(res => {
                setAddress(res.data);
            })

        apiClient.get(`/v1/SocialMedia`)
            .then(res => {
                setSocial(res.data);
            })
    }, [])
    return (
        <footer className="py-11 bg-dark">
            <Container>
                <Row>
                    <div className="col-12 col-lg-3"> <Link className="footer-logo text-white h2 mb-0" to="/">
                        Sajer<span className="text-primary">Bela</span>
                    </Link>

                        {/* <p className="my-3 text-muted" ontentEditable='true' dangerouslySetInnerHTML={{ __html: about.value }}></p> */}

                        <ul className="list-inline mb-0">
                            {
                                social?.map((soc, i) => (


                                    <li className="list-inline-item"><Link className="text-light ic-2x" to={`${soc.link}`}><i className={`${soc.icon}`} /></Link>
                                    </li>

                                ))
                            }
                        </ul>

                    </div>
                    <div className="col-12 col-lg-6 mt-6 mt-lg-0">
                        <Row>
                            <div className="col-12 col-sm-4 navbar-dark">
                                <h5 className="mb-4 text-white">Quick Links</h5>
                                <ul className="navbar-nav list-unstyled mb-0">
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/discontproduct">Discount Product</Link>
                                    </li>
                                    {/* <li className="mb-3 nav-item"><Link className="nav-link" to="/">Shop</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/">Faq</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/">Blogs</Link>
                                    </li>
                                    <li className="nav-item"><Link className="nav-link" to="/">Contact Us</Link>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                                <h5 className="mb-4 text-white"> Top Categories</h5>

                                {

                                    categories.map((cat, i) => (
                                        <ul className="navbar-nav list-unstyled mb-0" key={i}>
                                            <li className="mb-3 nav-item"><Link className="nav-link" to={`/catgory/${cat.id}`}>{cat.name}</Link></li>

                                        </ul>
                                    ))

                                }



                            </div>
                            <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                                <h5 className="mb-4 text-white">Brand</h5>
                                {
                                    brand.slice(0, 7).map((brand) => (
                                        <ul className="navbar-nav list-unstyled mb-0">
                                            <li className="mb-3 nav-item"><Link className="nav-link" to={`/grid-left-sidebar/${brand.id}`}>{brand.name}</Link>
                                            </li>
                                        </ul>
                                    ))
                                }

                            </div>
                        </Row>
                    </div>
                    <div className="col-12 col-lg-3 mt-6 mt-lg-0">
                        <div className="d-flex mb-3">
                            <div className="mr-2"> <i className="las la-map ic-2x text-primary" />
                            </div>
                            <div>
                                <h6 className="mb-1 text-light">address</h6>
                                <p className="mb-0 text-muted">{address.value}</p>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="mr-2"> <i className="las la-envelope ic-2x text-primary" />
                            </div>
                            <div>
                                <h6 className="mb-1 text-light">Email Us</h6>
                                <Link className="text-muted">{email.value}</Link>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="mr-2"> <i className="las la-mobile ic-2x text-primary" />
                            </div>
                            <div>
                                <h6 className="mb-1 text-light">Phone Number</h6>
                                <Link className="text-muted" >{phone.value}</Link>
                            </div>
                        </div>
                        {/* <div className="d-flex">
                    <div className="mr-2"> <i className="las la-clock ic-2x text-primary" />
                    </div>
                    <div>
                        <h6 className="mb-1 text-light">Working Hours</h6>
                        <span className="text-muted">Mon - Fri: 10AM - 7PM</span>
                    </div>
                </div> */}
                    </div>
                </Row>
                <hr className="my-8" />
                <Row className="text-muted align-items-center">
                    <Col md={7}> <i className="lar la-heart text-primary heartBeat2" />  <u><a className="text-primary" href="https://www.evertechit.com/">{copyRight.value}</a></u>
                    </Col>
                    <Col md={5} className="text-md-right mt-3 mt-md-0">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/01.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/02.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/03.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/04.png`)} alt="" />
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default footer1