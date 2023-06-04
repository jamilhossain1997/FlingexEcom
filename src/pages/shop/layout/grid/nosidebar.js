import React, { useState, useEffect } from "react";
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FilterProduct } from '../../../../services';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import Sidebar from '../../../../widgets/filter/Sidebar';
import Topbar from '../../../../widgets/filter/Topbar';
import Listview from '../../../../widgets/shop/listview';
import Pageheading from '../../../../widgets/pageheading';
import imgUrl from '../../../../api/baseUrl';
import apiClient from '../../../../api/http-common';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Helmet } from 'react-helmet';

const PAGE_SIZE = 10;
const nosidebar = (props) => {
    const [pro, setPro] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const [visible, setVisible] = useState(12);
    const [isCompleted, setIsCompleted] = useState(false);
    const [randomPro, setRandomPro] = useState([]);
    const convert = 0.011904761904762;

    // LoadMore
    const loadMore = () => {
        setVisible((prev) => prev + 12);
        if (visible >= pro?.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        let category_slug = props.match.params.id;
        // console.log(this.props.match.params.id)
        apiClient.get(`v1/categories/products_slug/${category_slug}`)
            .then(res => {
                setPro(res.data);
                console.log(res.data);
            })
    }, []);
    useEffect(() => {
        apiClient.get(`v1/products/productView`)
            .then(res => {
                setRandomPro(res.data.products);
            })
    }, []);


    return (
        <>

            <Helmet>
                <title>
                    Discover the latest fashion trends for women at our online store "Sajer
                    Bela". Shop a wide range of clothing, footwear, and accessories with
                    attractive discount on all orders. Find your perfe
                </title>
                <meta property="og:title" content="Discover the latest fashion trends for women at our online store Sajer
                    Bela" />
                <meta property="og:description" content="Welcome to the world of women's fashion where style meets comfort. Our online store is your one-stop destination for all the latest fashion trends and must-haves for the modern woman. We believe that fashion should be accessible to everyone, and that's why we bring you an extensive collection of stylish and affordable clothing, footwear, and accessories. From casual everyday outfits to elegant partywear, we have something for every occasion. Whether you're looking for the latest trends or classic staples, we've got you covered. Our collection includes a range of tops, dresses, pants, skirts, and jackets that are perfect for creating endless outfit combinations. You can shop by category or browse our curated collections to find the perfect pieces to suit your personal style. We understand the importance of accessories in completing any look, which is why we offer a wide selection of jewelry, bags, and shoes. Our accessories are designed to complement our clothing, making it easy for you to put together a complete and cohesive outfit. At our online store, we believe in making fashion accessible and affordable, which is why we offer free shipping on all orders. You can shop with confidence, knowing that you're getting high-quality products at unbeatable prices. So what are you waiting for? Browse our collection today and start building your dream wardrobe." />
                <meta property="og:image" content="https://admin.sajerbela.com/storage/app/public/company/2023-03-31-6426dc9918aaa.png" />
                <meta property="og:site_name" content="Sajer Bela" />
                <meta
                    property="og:url"
                    content="https://sajerbela.com/"
                />
            </Helmet>
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={""} title={"Product"} />
            </section>
            {/*hero section start*/}
            {/*body content start*/}

            <div className="page-content">
                <section>
                    <Container fluid>
                        <Row>
                            <Col lg={9} md={12} className="order-lg-1">
                                {/* <Topbar productdata={this.state.pro.length} /> */}
                                <Row>

                                    {(pro.length > 0) ?
                                        <>
                                            {pro?.slice(0, visible).map((product, index) => (
                                                <Listview productdata={product} key={index} />
                                            ))}
                                        </>
                                        :
                                        <Container fluid>
                                            <Row>
                                                {
                                                    Array(5).fill(undefined).map((v, i) =>
                                                        <>
                                                            <Col xs={6} xl={3} lg={2} md={6} key={i}>
                                                                <Skeleton variant="rectangular" height={200} width={300} />
                                                                <Skeleton variant="rectangular" width={300} count={3} />
                                                            </Col>
                                                        </>

                                                    )
                                                }
                                            </Row>
                                        </Container>
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
                            </Col>
                            {/* <Col lg={2} md={12} className="order-lg-2">
                                {
                                    randomPro?.map((productdata) =>
                                        <>

                                            <div className="card product-card">
                                                <Link className="d-block" to={`/product-single/${productdata.slug}`}>

                                                    <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} />
                                                </Link>

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
                                        </>
                                    )
                                }
                            </Col> */}
                            <Col lg={3} md={12} className="sidebar mt-8 mt-lg-0">
                                <Sidebar productdata={pro} />
                                {/* <Sidebar /> */}
                            </Col>
                        </Row>

                    </Container>
                </section>
            </div>
        </>
    );
}

export default nosidebar
