import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col, Container, CardBody, CardText, CardSubtitle, CardTitle } from 'reactstrap';
import { toast, ToastContainer } from "react-toastify";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import apiClient from "../../api/http-common";
import imgUrl from "../../api/baseUrl";
import { RiShoppingBag3Line } from "react-icons/ri";

const latestapi = async () => {
    const result = await apiClient.get(`/v1/products/latest`);
    return result.data;
};
const latestProduct = () => {
    const [visible, setVisible] = useState(12);
    const [isCompleted, setIsCompleted] = useState(false);
    const { isLoading, error, data } = useQuery("latestapi1", latestapi);

    // LoadMore
    const loadMore = () => {
        setVisible((prev) => prev + 12);
        if (visible >= data?.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    };



    const convert = 0.011904761904762;
    return (
        <>
            <Row className="justify-content-center text-center">
                <Col lg={8} md={10}>

                    <div className="mb-8">
                        <h6 className="text-primary mb-1">
                            — New Collection
                        </h6>
                        <h2 className="mb-0">Trending Products</h2>
                    </div>

                </Col>
            </Row>
            <div className="">
                <Container fluid>
                    <Row>
                        <ToastContainer autoClose={900} />
                        {data?.products?.slice(0, visible).map((productdata) => {
                            return (
                                <React.Fragment key={productdata.id}>
                                    <Col xs={6} xl={2} lg={2} md={6} >
                                        <div className="card product-card">

                                            {
                                                productdata.video_url ?
                                                    <Link className="d-block" to={`/product-single/${productdata.slug}`}>
                                                        {/* <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/${productdata.images[0]}`} alt="hello" /> */}
                                                        <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} />
                                                        <div style={{ zIndex: `9999`, marginTop: `-138px`, marginLeft: `80px` }}>
                                                            <BiCaretRightCircle size={70} />
                                                        </div>

                                                    </Link>
                                                    :
                                                    <Link className="d-block" to={`/product-single/${productdata.slug}`}>
                                                        {/* <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/${productdata.images[0]}`} alt="hello" /> */}
                                                        <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} />
                                                    </Link>


                                            }
                                            {/* <BiCaretRightCircle width={10} style={{ width: `20px` }} /> */}




                                            <div className="product-title">
                                                <Link to={`/product-single/${productdata.slug}`} className="link-title ml-1" style={{ fontSize: 12 }}>
                                                    {productdata.name}
                                                </Link>
                                            </div>
                                            <div className="mt-1">

                                                <span className="product-price text-info">
                                                    {
                                                        productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <>৳{Math.round((productdata?.unit_price / convert) - (productdata?.unit_price / convert * productdata?.discount) / 100)}</> : <>৳{(Math.round(productdata?.unit_price / convert) - ((productdata?.discount) / convert))}</> : <>৳{Math.round(productdata?.unit_price / convert)}</>
                                                    }

                                                </span><br />
                                                <span>
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
};

export default latestProduct;
