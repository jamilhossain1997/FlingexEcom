import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from 'react-query';

const model = (props) => {
    const [viewproduct, setViewproduct] = useState(props.viewproduct);

    function AddToCart(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null)
            Cart = new Array();
        let selectedProduct = Cart.find(product => product.ProductID === ProductID);
        if (selectedProduct == null) {
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

    function AddToWishList(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("WishlistProduct"));
        if (Cart == null)
            Cart = new Array();

        let selectedProduct = Cart.find(product => product.ProductID === ProductID);
        if (selectedProduct == null) {

            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, StockStatus: StockStatus });
            localStorage.removeItem("WishlistProduct");
            localStorage.setItem("WishlistProduct", JSON.stringify(Cart));

            toast.success("Item Added to WishList");
        }
        else {
            toast.warning("Item is already in WishList");
        }


    }
    function CheckCardItem(ID) {
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
    function CheckWishList(ID) {
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
    function onChangeColor(event) {
        console.log(event.target.value);
        setSelectedColor(event.target.value)
        // this.setState({
        //   selectedColor: event.target.value
        // });
    }
    return (
        <Modal isOpen={props.modelview} toggle={props.modelview} className="view-modal">
            <ToastContainer autoClose={900} />
            <ModalHeader className="border-bottom-0 pb-0">
                {/* <Button className="close " color="danger" onClick={() => this.quickview()} ><span aria-hidden="true">×</span></Button> */}
            </ModalHeader>
            <ModalBody>
                <Row className="align-items-center">
                    <div className="col-lg-5 col-12">
                        <img className="img-fluid rounded" src={`${imgUrl}storage/app/public/product/thumbnail/${viewproduct.thumbnail}`} alt="hello" />
                    </div>
                    <div className="col-lg-7 col-12 mt-5 mt-lg-0">
                        <div className="product-details">
                            <h3 className="mb-0">{viewproduct.name}</h3>
                            <div className="star-rating mb-4"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                            </div>
                            <span className="product-price h4">
                                <span className="product-price">

                                    {
                                        viewproduct.discount > 0 ? viewproduct?.discount_type == 'percent' ? <> Discount:{Math.round((viewproduct.discount))}%</> : null : null
                                    }

                                    {
                                        viewproduct.discount > 0 ? viewproduct?.discount_type == 'flat' ? <> Discount:৳{Math.round((viewproduct.discount / convert))}</> : null : null
                                    }
                                </span><br />
                                <span className="product-price">
                                    {
                                        viewproduct.discount > 0 ? viewproduct?.discount_type == 'percent' ? <>৳{(Math.round(viewproduct?.unit_price / convert, 2)) - (Math.round(((viewproduct?.unit_price / convert * viewproduct?.discount)), 2) / 100)}</> : <>৳{(Math.round(viewproduct?.unit_price / convert, 2)) - (Math.round((viewproduct?.discount) / convert, 2))}</> : <>৳{Math.round(viewproduct?.unit_price / convert, 2)}</>
                                    }
                                    <span>
                                        {
                                            viewproduct?.discount > 0 ? <del className="text-muted h6"> ৳{Math.round(viewproduct?.unit_price / convert, 2)}</del>
                                                : null
                                        }
                                    </span>
                                    {/* <del className="text-muted">{productdata.unit_price}</del>{productdata.unit_price} */}
                                </span>

                            </span>

                            <ul className="list-unstyled my-4">
                                <li className="mb-2">Availibility: <span className="text-muted"> {viewproduct.current_stock}</span>
                                </li>
                                {/* <li>Categories :<span className="text-muted"> {viewproduct.category}</span>
                                        </li> */}
                            </ul>
                            <p className="mb-4">{viewproduct.description}</p>
                            <div className="d-sm-flex align-items-center mb-5">
                                <div className="d-flex align-items-center mr-sm-4">
                                    {useCounter}
                                </div>
                                <select className="custom-select mt-3 mt-sm-0" id="inputGroupSelect01">
                                    <option selected>Size</option>
                                    {viewproduct?.variation?.map((sizes, index) => {
                                        return (<option key={index}>{sizes.type}</option>)
                                    }
                                    )}
                                </select>


                                <div className="d-flex text-center ml-sm-4 mt-3 mt-sm-0">
                                    {(viewproduct.colors) && viewproduct.colors.map((color, index) => {
                                        return (
                                            <div className="form-check pl-0 mr-3" key={index}>
                                                <div className="form-check pl-0">
                                                    <input type="checkbox" value={color} className="form-check-input" />
                                                    <label className="form-check-label" style={{ background: color }} />
                                                </div>
                                                <input type="checkbox" className="form-check-input" id={`color-filter`.index} value={color} />
                                                <label className="form-check-label" htmlFor={`color-filter`.index} data-bg-color={color} />
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                            <div className="d-sm-flex align-items-center mt-5">
                                {/* {!this.WishlistItems(viewproduct.id) ?
                            <Link to="#" onClick={() => this.Productaddwishlist(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, productdata.unit_price, productdata.current_stock)} className="btn btn-animated btn-dark"><i className="lar la-heart mr-1" />Add To Wishlist</Link>
                            :
                            <Link to="/wishlist" className="btn btn-animated btn-dark" ><i className="lar la-heart mr-1" />View Wishlist </Link>
                        } */}
                                {!CheckCardItem(viewproduct.id) ?
                                    <Link to="#" onClick={() => AddToCart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, productdata.unit_price, productdata.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Add To Cart</Link>
                                    :
                                    <Link to="/cart" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" id="viewcart1"><i className="las la-shopping-cart mr-1" />view cart</Link>

                                }


                                <Link to="/cart" onClick={() => AddToCart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, productdata.unit_price, productdata.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Buy Now</Link>

                                {/* {!this.CartItems(viewproduct.id) ?
                            <Link to="#" onClick={() => this.Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, productdata.unit_price, productdata.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Add To Cart</Link>
                            :
                            <Link to="/cart" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" id="viewcart1"><i className="las la-shopping-cart mr-1" />view cart</Link>

                        } */}

                            </div>
                            <div className="d-sm-flex align-items-center border-top pt-4 mt-5">
                                <h6 className="mb-sm-0 mr-sm-4">Share It:</h6>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-facebook" /></Link>
                                    </li>
                                    <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-dribbble" /></Link>
                                    </li>
                                    <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-instagram" /></Link>
                                    </li>
                                    <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-twitter" /></Link>
                                    </li>
                                    <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-linkedin" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default model