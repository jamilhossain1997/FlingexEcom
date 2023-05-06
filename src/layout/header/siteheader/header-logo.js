
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Search from './Search';
import axios from 'axios';
import apiClient from '../../../api/http-common';
import imgUrl from '../../../api/baseUrl';

const Headerlogo = () => {
    const [logo, setLogo] = useState([]);
    const [phone, setPhone] = useState([]);
    useEffect(() => {
        apiClient.get(`/v1/company-info`)
            .then(res => {
                setLogo(res.data)
            })

        apiClient.get(`/v1/company-phone`)
            .then(res => {
                setPhone(res.data);
            })
    }, [])


    return (
        <div className="py-md-3 py-2">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="d-none d-md-flex align-items-center">
                        <Link className="navbar-brand logo d-none d-lg-block" to="/">
                            <img className="img-fluid" src={`${imgUrl}storage/app/public/company/${logo.value}`} alt="hello" />
                        </Link>
                        <div className="media ml-lg-11"> <i className="las la-mobile-alt ic-2x bg-white rounded p-2 shadow-sm mr-2 text-primary" />
                            <div className="media-body"> <span className="mb-0 d-block">Call Us</span>
                                <a className="text-muted" >{phone.value}</a>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} >
                        <Search />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Headerlogo