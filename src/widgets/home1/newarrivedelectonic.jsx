import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';
import { Link } from 'react-router-dom';
import { Row, Container } from 'reactstrap';
import axios from 'axios';

const newarrivedelectonic = () => {
    const [topRated, setTopRated] = useState([]);
    const [bestSellings, setBestSellings] = useState([]);
    const [discountedProduct, setDiscountedProduct] = useState([]);
    useEffect(() => {
        apiClient.get(`v1/products/top-rated`)
            .then(res => {
                setTopRated(res.data.products)

            })
    }, [])

    useEffect(() => {
        apiClient.get(`v1/products/best-sellings`)
            .then(res => {
                setBestSellings(res.data.products)
            })
    }, [])

    useEffect(() => {
        apiClient.get(`v1/products/discounted-product`)
            .then(res => {
                setDiscountedProduct(res.data.products)
            })
    }, [])
    const convert = 0.011904761904762;
    return (
        <div>
            <Container fluid>
                <Row>
                    <div className="col-lg-4 col-md-6">
                        <h5 className="mb-3 font-w-5 text-center text-info"><span className="text-info">—</span> Top Rated</h5>
                        {topRated?.map((productdata, index) =>
                        (
                            <div className="media align-items-center mb-1" key={index}>
                                <Link className="d-block mr-3" to={`/product-single/${productdata.slug}`}>
                                    <img className="rounded" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata?.thumbnail}`} alt={`${productdata.slug}`} width={100} />
                                </Link>
                                <div className="media-body">
                                    <div className="product-title" style={{ fontSize: 12 }}><Link className="link-title" to={`/product-single/${productdata.slug}`}>{productdata.name}</Link>
                                    </div>
                                    <span className="product-price">
                                        {
                                            productdata?.discount > 0 ? <del className="text-muted" style={{ fontSize: 12 }}> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>
                                                : null
                                        }
                                        {/* <del className="text-muted">{productdata.price}</del> */}
                                        {
                                            productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <><span className='text-info' style={{ fontSize: 13 }}>৳{Math.round((productdata?.unit_price / convert) - (productdata?.unit_price / convert * productdata?.discount) / 100)} </span></> : <><span style={{ fontSize: 13 }} className='text-info'>৳{(Math.round(productdata?.unit_price / convert) - ((productdata?.discount) / convert))}</span></> : <><span style={{ fontSize: 13 }} className='text-info'>৳{Math.round(productdata?.unit_price / convert)}</span></>
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-4 col-md-6 mt-8 mt-md-0">
                        <h5 className="mb-3 font-w-5 text-center text-info"><span className="text-info">—</span> Best Seller</h5>
                        {bestSellings?.map((productdata, index) =>
                        (
                            <div className="media align-items-center mb-1" key={index}>
                                <Link className="d-block mr-3" to={`/product-single/${productdata.slug}`}>
                                    <img className="rounded" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata?.thumbnail}`} alt={`${productdata.slug}`} width={100} />
                                </Link>
                                <div className="media-body">
                                    <div className="product-title" style={{ fontSize: 12 }}><Link className="link-title" to={`/product-single/${productdata.slug}`}>{productdata.name}</Link>
                                    </div>
                                    <span className="product-price">
                                        {
                                            productdata?.discount > 0 ? <del className="text-muted" style={{ fontSize: 12 }}> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>
                                                : null
                                        }
                                        {/* <del className="text-muted">{productdata.price}</del> */}
                                        {
                                            productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <><span className='text-info' style={{ fontSize: 13 }}>৳{Math.round((productdata?.unit_price / convert) - (productdata?.unit_price / convert * productdata?.discount) / 100)} </span></> : <><span style={{ fontSize: 13 }} className='text-info'>৳{(Math.round(productdata?.unit_price / convert) - ((productdata?.discount) / convert))}</span></> : <><span style={{ fontSize: 13 }} className='text-info'>৳{Math.round(productdata?.unit_price / convert)}</span></>
                                        }

                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-4 col-md-6 mt-8 mt-lg-0">
                        <h5 className="mb-3 font-w-5 text-center text-info"><span className="text-info">—</span> Discount Item</h5>
                        {discountedProduct?.map((productdata, index) =>
                        (
                            <div className="media align-items-center mb-1" key={index}>
                                <Link className="d-block mr-3" to={`/product-single/${productdata.slug}`}>
                                    <img className="rounded" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata?.thumbnail}`} alt={`${productdata.slug}`} width={100} />
                                </Link>
                                <div className="media-body">
                                    <div className="product-title" style={{ fontSize: 12 }}><Link className="link-title" to={`/product-single/${productdata.slug}`}>{productdata.name}</Link>
                                    </div>
                                    <span className="product-price">
                                        {
                                            productdata?.discount > 0 ? <del className="text-muted" style={{ fontSize: 12 }}> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>
                                                : null
                                        }
                                        {/* <del className="text-muted">{productdata.price}</del> */}
                                        {
                                            productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <><span className='text-info' style={{ fontSize: 13 }}>৳{Math.round((productdata?.unit_price / convert) - (productdata?.unit_price / convert * productdata?.discount) / 100)} </span></> : <><span style={{ fontSize: 13 }} className='text-info'>৳{(Math.round(productdata?.unit_price / convert) - ((productdata?.discount) / convert))}</span></> : <><span style={{ fontSize: 13 }} className='text-info'>৳{Math.round(productdata?.unit_price / convert)}</span></>
                                        }

                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default newarrivedelectonic
