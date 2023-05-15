import React, { useEffect, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from 'react-query';
// import apiClient from '../../api/http-common';
import imgUrl from '../../../api/baseUrl';
import apiClient from '../../../api/http-common';
import { useScrollToTop } from '../../../Utility/utility';
import axios from 'axios';

window.fn = OwlCarousel;



const relatedProduct = (props) => {
    // console.log(props.slug)
    const [relatedproducts, setRelatedproducts] = useState([]);
    const [sulg, setSulg] = useState(props.slug);
    const setScrollToTop = useScrollToTop(true);
    // console.log(sulg)

    useEffect(() => {
        apiClient.get(`/v1/products/related-products/${sulg}`)
            .then(function (response) {
                // console.log(response.data)
                setRelatedproducts(response.data)
            });
    }, [])

    const options = {
        loop: true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            300: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            },
        },
    }

    function quickview() {
        setModelview(!modelview);
    }

    // function toggle(tab) {
    //     if (activeTab !== tab) {
    //         setActiveTap(tab)
    //     }
    // }

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
                    wishlist = true
                }
            }
        }
        return wishlist;
    }

    function Productaddwishlist(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("WishlistProduct"));
        if (Cart == null)
            Cart = new Array();

        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {

            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, StockStatus: StockStatus });
            localStorage.removeItem("WishlistProduct");
            localStorage.setItem("WishlistProduct", JSON.stringify(Cart));

            toast.success("Item Added to WishList");
        }
        else {
            toast.warning("Item is already in WishList");
        }


    }

    // cart add
    function Productaddcart(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null)
            Cart = new Array();
        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, StockStatus: StockStatus });
            localStorage.removeItem("CartProduct");
            localStorage.setItem("CartProduct", JSON.stringify(Cart));
            var flag = 0;
            if (flag == 0) {
                toast.success("Item Added to Cart");
                flag = 1;
            }
        }
        else {
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
                    checkcart = true
                }
            }
        }
        return checkcart;
    }

    const convert = 0.011904761904762;

    return (
        <>

            <ToastContainer autoClose={5000} />
            {relatedproducts.length > 0 ?
                <Row>
                    <Col>
                        {/* Tab panes */}
                        <div className="tab-content p-0" id="nav-tabContent">
                            <OwlCarousel
                                className="owl-carousel no-pb owl-2"
                                {...options}
                                navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}

                            >
                                {relatedproducts?.map((productdata, index) => {
                                    return (

                                        <div className="item" key={index}>
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
                                        </div>
                                    )
                                }
                                )}
                            </OwlCarousel>
                        </div>
                    </Col>
                </Row>
                : <h3 className="mb-4">Your Related Product is Currently Empty.</h3>
            }

        </>
    )
}

export default relatedProduct