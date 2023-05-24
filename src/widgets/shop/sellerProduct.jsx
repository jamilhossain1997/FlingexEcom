import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCaretRightCircle } from "react-icons/bi";
import imgUrl from '../../api/baseUrl';
import apiClient from '../../api/http-common';
import { useParams } from "react-router-dom";
import SellerProductBanner from "./sellerProductBanner";

const sellerProduct = () => {
    const [sellerProduct, setSellerProduct] = useState([]);
    const { id } = useParams();
    const convert = 0.011904761904762;
    const [visible, setVisible] = useState(12);
    const [isCompleted, setIsCompleted] = useState(false);


    useEffect(() => {
        apiClient.get(`v1/seller/${id}/all-products`)
            .then((res) => {
                setSellerProduct(res.data.products);
                // console.log(res.data)
            })
    }, [])



    // LoadMore
    const loadMore = () => {
        setVisible((prev) => prev + 12);
        if (visible >= sellerProduct?.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    };


    return (
        <div>
            <SellerProductBanner id={id} />
            <Container>
                <Row>

                    {
                        sellerProduct?.slice(0, visible).map((productdata) =>
                            <>
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
                            </>
                        )
                    }

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
    )
}

export default sellerProduct
