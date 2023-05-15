import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import imgUrl from '../../api/baseUrl';
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCaretRightCircle } from "react-icons/bi";

const listview = (props) => {

    const [modelview, setModelview] = useState(false);
    const [viewproduct, setViewproduct] = useState("");
    const convert = 0.011904761904762;
    const productdata = props.productdata;


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


    function Productaddcart(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null)
            Cart = new Array();
        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
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

    function Productbuycart(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null)
            Cart = new Array();
        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
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
    return (
        <>
            <ToastContainer autoClose={900} />

            <Col xs={6} xl={3} lg={4} md={6} >


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

        </>
    )
}

export default listview
