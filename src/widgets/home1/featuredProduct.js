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



const featuredpi = async () => {
    const result = await apiClient.get(`v1/products/featuredWeb`);
    return result.data;
};
const featuredProduct = () => {
    const [activeTab, setActiveTap] = useState(1);
    const [modelview, setModelview] = useState(false);
    const [viewproduct, setViewproduct] = useState("");
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const { isLoading, error, data } = useQuery("featuredpi1", featuredpi);
    const [visible, setVisible] = useState(12);
    const [isCompleted, setIsCompleted] = useState(false);

    // LoadMore
    const loadMore = () => {
        setVisible((prev) => prev + 12);
        if (visible >= data?.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    };


    // quickview

    function quickview() {
        setModelview(!modelview);
    }

    function toggle(tab) {
        if (activeTab !== tab) {
            setActiveTap(tab);
        }
    }

    function onClickQuickView(product) {
        setModelview(true);
        setViewproduct(product);
    }

    // WishlistItems
    function WishlistItems(ID) {
        let wishlist = false;
        var Wish = JSON.parse(localStorage.getItem("WishlistProduct"));

        if (Wish && Wish.length > 0) {
            for (const wishItem of Wish) {
                if (wishItem.ProductID === ID) {
                    wishlist = true;
                }
            }
        }
        return wishlist;
    }

    function Productaddwishlist(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("WishlistProduct"));
        if (Cart == null) Cart = new Array();

        let Productadd = Cart.find((product) => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("WishlistProduct");
            localStorage.setItem("WishlistProduct", JSON.stringify(Cart));

            toast.success("Item Added to WishList");
        } else {
            toast.warning("Item is already in WishList");
        }
    }

    // cart add
    function Productaddcart(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null) Cart = new Array();
        let Productadd = Cart.find((product) => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("CartProduct");
            localStorage.setItem("CartProduct", JSON.stringify(Cart));
            var flag = 0;
            if (flag == 0) {
                toast.success("Item Added to Cart");
                flag = 1;
            }
        } else {
            toast.warning("Item is already in Cart");
        }
    }

    // CartItems

    function CartItems(ID) {
        let checkcart = false;
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart && Cart.length > 0) {
            for (const cartItem of Cart) {
                if (cartItem.ProductID === ID) {
                    checkcart = true;
                }
            }
        }
        return checkcart;
    }

    function onChangeColor(event) {
        console.log(event.target.value);
        setSelectedColor(event.target.value)
        // this.setState({
        //   selectedColor: event.target.value
        // });
    }

    if (isLoading) {
        return (
            <>
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
            </>

        );
    }
    const convert = 0.011904761904762;
    return (
        <>
            <Row className="justify-content-center text-left mb-2">
                <Col lg={12} md={12}>
                    <div className="mb-2">
                        <h4 className="text-info mb-1">
                            Featured Product
                        </h4>
                        <hr />
                        {/* <h2 className="mb-0">Trending Products</h2> */}
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

export default featuredProduct
