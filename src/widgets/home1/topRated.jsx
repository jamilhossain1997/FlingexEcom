import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col, Container, CardBody, CardText, CardSubtitle, CardTitle } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from 'react-query';
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';
import { RiShoppingBag3Line } from "react-icons/ri";


const TopRated = async () => {
    const result = await apiClient.get(`v1/products/top-rated`);
    return result.data.products;
};
const topRated = () => {
    const { isLoading, error, data } = useQuery("TopRated", TopRated);
    const [visible, setVisible] = useState(12);
    const [isCompleted, setIsCompleted] = useState(false);
    const convert = 0.011904761904762;
    // LoadMore
    const loadMore = () => {
        setVisible((prev) => prev + 12);
        if (visible >= data?.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    };

    return (
        <>
            <Row className="justify-content-center text-left mb-2">
                <Col lg={12} md={12}>
                    <div className="mb-2">
                        <h4 className="text-info mb-1">
                            Top-Reated Product
                        </h4>
                        <hr />
                    </div>
                </Col>
            </Row>
            <div className="">
                <Container fluid>
                    <Row>
                        <ToastContainer autoClose={900} />
                        {data?.slice(0, visible).map((productdata) => {
                            return (
                                <React.Fragment key={productdata.id}>
                                    <Col xs={6} xl={2} lg={2} md={6} >
                                        <div className="card product-card">
                                            <Link className="d-block" to={`/product-single/${productdata.slug}`}>
                                                {/* <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/${productdata.images[0]}`} alt="hello" /> */}
                                                <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} />
                                            </Link>
                                            {/* <BiCaretRightCircle width={10} style={{ width: `20px` }} /> */}
                                            <div className="product-title">
                                                <Link to={`/product-single/${productdata.slug}`} className="link-title " style={{ fontSize: 13 }}>
                                                    <strong className="d-flex justify-content ml-1">
                                                        {productdata.name}
                                                    </strong>
                                                </Link>
                                            </div>
                                            <div className="mt-1">
                                                <span className="product-price text-info ml-1">
                                                    {
                                                        productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <>৳{Math.round((productdata?.unit_price / convert) - (productdata?.unit_price / convert * productdata?.discount) / 100)}</> : <>৳{(Math.round(productdata?.unit_price / convert) - ((productdata?.discount) / convert))}</> : <>৳{Math.round(productdata?.unit_price / convert)}</>
                                                    }
                                                </span><br />
                                                <span className="product-price">
                                                    {
                                                        productdata?.discount > 0 ? <del className="text-muted ml-1 h6" style={{ fontSize: 12 }}> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>
                                                            : null
                                                    }
                                                    {
                                                        productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <> <span className="text-muted h6 ml-1" style={{ fontSize: 12 }}>-{Math.round((productdata.discount))}%</span></> : null : null
                                                    }
                                                    {
                                                        productdata.discount > 0 ? productdata?.discount_type == 'flat' ? <> <span className="text-muted h6 ml-1" style={{ fontSize: 12 }}>- ৳{Math.round((productdata.discount / convert))}</span></> : null : null
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                </React.Fragment>
                            );
                        })}
                    </Row>
                    <div className="d-grid mt-3 mb-5 justify-content-center text-center">
                        {isCompleted ? (
                            <button
                                onClick={loadMore}
                                type="button"
                                className="btn btn-info disabled"
                            >
                                That's It
                            </button>
                        ) : (
                            <button onClick={loadMore} type="button" className="btn btn-info">
                                Load More +
                            </button>
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
}

export default topRated
