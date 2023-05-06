import React, { useState, useEffect } from "react";
import { TabContent, Container, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
// import { toast, ToastContainer } from 'react-toastify';
import classnames from "classnames";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import apiClient from "../../api/http-common";
import imgUrl from "../../api/baseUrl";

const brandapi = async () => {
    const result = await apiClient.get(`/v1/brands`);
    return result.data;
};

const brand = () => {
    // api
    const { isLoading, error, data } = useQuery("brandapi", brandapi);

    const options = {
        loop: true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            300: {
                items: 4,
            },
            600: {
                items: 6,
            },
            1000: {
                items: 10,
            },
        },
    };

    if (isLoading)
        return (
            <Skeleton variant="rectangular" height={500} />
        );
    return (
        <>

            <Container>
                <Row className="justify-content-center text-center">
                    <Col lg={8} md={10}>
                        <div className="mb-2">
                            <h6 className="text-primary mb-1">— Brand gallery</h6>
                            {/* <h2 className="mb-0">{cat.name}</h2> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Tab panes */}

                        <OwlCarousel className="owl-carousel no-pb owl-2" {...options} navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}>
                            {data?.map((productdata, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="card product-card">
                                            <div className="card-info">
                                                <Link to={`/grid-left-sidebar/${productdata.id}`}>
                                                    {
                                                        productdata.image ?
                                                            <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/brand/${productdata.image}`} alt="hello" /> : <Skeleton variant="rectangular" height={500} />
                                                    }
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </OwlCarousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default brand;
