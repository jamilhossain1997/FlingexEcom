import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import apiClient from '../../../api/http-common';

const Headertop = () => {
    const [social, setSocial] = useState([]);

    useEffect(() => {
        apiClient.get(`/v1/SocialMedia`)
            .then(res => {
                setSocial(res.data);
            })
    }, []);
    return (
        <div className="header-top bg-dark py-1">
            <Container>
                <Row className="align-items-center">
                    <Col md={12} className="d-flex align-items-center justify-content-between text-white">
                        <div className="d-none d-md-flex align-items-center"> <small className="mr-3"><i className="las la-store text-primary mr-1 align-middle" />Welcome to Our store Sajer bela</small>  <small><i className="las la-truck text-primary mr-1 align-middle" /> Free shipping worldwide</small>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="language-selection mr-2">
                                <div className="dropdown">
                                    <button className="btn btn-sm text-white dropdown-toggle" data-toggle="dropdown">English</button>
                                    <div className="dropdown-menu"><Link className="dropdown-item" to="#">English</Link>
                                        <Link className="dropdown-item" to="#">Arabic</Link>
                                        <Link className="dropdown-item" to="#">French</Link>
                                        <Link className="dropdown-item" to="#">Italian</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="social-icons">
                                <ul className="list-inline mb-0">
                                    {
                                        social?.map((soc, i) => (
                                            <li className="list-inline-item"><Link className="text-muted" to={`${soc.link}`}><i className={`${soc.icon}`} /></Link>
                                            </li>
                                        ))
                                    }


                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default Headertop;