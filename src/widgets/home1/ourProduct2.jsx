import React, { useState, useEffect } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import classnames from 'classnames';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import apiClient from '../../api/http-common';
import axios from 'axios';
window.fn = OwlCarousel;

const bestsellings = async () => {
    const result= await  apiClient.get(`/v1/products/best-sellings`)
         return result.data;
 }

const ourProduct2 = () => {
    const { isLoading, error, data } = useQuery('bestsellings',bestsellings);
    const [activeTab, setActiveTap] = useState(1);
    const [modelview, setModelview] = useState(false);
    const [viewproduct, setViewproduct] = useState('');
    const [proList, setProList] = useState([]);

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
                items: 3,
            },
        },
    }

    // api
    // useEffect(() => {
    //     axios.get(`/api/v1/products/best-sellings`)
    //         .then(res => {
    //             // console.log(res.data.products);
    //             setProList(res.data.products)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [proList])

    // quickview

    function quickview() {
        setModelview(!modelview);
    }

    function toggle(tab) {
        if (activeTab !== tab) {
            setActiveTap(tab)
        }
    }

    function onClickQuickView(product) {
        setModelview(true);
        setViewproduct(product);
        // this.setState({
        //     modelview: true,
        //     viewproduct: product
        // })
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

    return (
        <>
            <ToastContainer autoClose={900} />
            <div className="shadow p-sm-8 p-3 bg-white">
                <Row className="align-items-end mb-6">
                    <div className="col-lg-6">
                        <div>
                            <h6 className="text-primary mb-1">
                                — New Collection
                            </h6>
                            <h2 className="mb-0">Our Products</h2>
                        </div>
                    </div>
                    <div className="col-lg-6 text-lg-right mt-4 mt-lg-0">
                        {/* Nav tabs */}
                        <Nav tabs className="d-inline-block justify-content-md-end" id="nav-tab" role="tablist">
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    Top Rated
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    New Product
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '3' })}
                                    onClick={() => { toggle('3'); }}
                                >
                                    Best Seller
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Row>
                <Row>
                    <Col>
                        {/* Tab panes */}
                        <div className="tab-content p-0" id="nav-tabContent">
                            <TabContent className="p-0" activeTab={activeTab}>
                                <TabPane className="fade show" tabId="1">
                                    <OwlCarousel
                                        className="owl-carousel no-pb owl-2"
                                        {...options}
                                        navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}

                                    >
                                        {data?.map((productdata, index) => (
                                                <div className="item" key={index}>
                                                    <div className="card product-card">
                                                        {!WishlistItems(productdata.id) ?
                                                            <Link to="#" onClick={() => Productaddwishlist(productdata.id, productdata.name, 1, productdata.salePrice, "In Stock")} className="btn-wishlist btn-sm" id="addtowish"><i className="lar la-heart" /></Link>
                                                            :
                                                            <Link to="/cart" className="btn-wishlist btn-sm" id="viewwishlist"><i className="las la-heart" /></Link>
                                                        }

                                                        {/* <img className="card-img-top card-img-back" src={require(`http://127.0.0.1:8000/storage/product/thumbnail/${productdata.images}`).default} alt="..." /> */}
                                                        {/* <img className="card-img-top card-img-front" src={require(`http://127.0.0.1:8000/storage/product/thumbnail/${productdata.thumbnail}`).default} alt="..." /> */}
                                                        <Link className="card-img-hover d-block" to={`/product-single-left/${productdata.id}`}>
                                                            <img className="card-img-top card-img-back" src={`/storage/product/${productdata.images[0]}`} alt="hello" />
                                                             <img className="card-img-top card-img-front" src={`/storage/product/thumbnail/${productdata.thumbnail}`} alt="hello"/>
                                                        </Link>
                                                        <div className="card-info">
                                                            <div className="card-body">
                                                                <div className="product-title"><Link to="/product-single" className="link-title">{productdata.name}</Link>
                                                                </div>
                                                                <div className="mt-1"> <span className="product-price"><del className="text-muted">$ {productdata.unit_price}</del> $ {productdata.unit_price}</span>
                                                                    <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer bg-transparent border-0">
                                                                <div className="product-link d-flex align-items-center justify-content-center">
                                                                    {!WishlistItems(productdata.id) ?
                                                                        <Link to="#" onClick={() => Productaddwishlist(productdata.id, productdata.name, productdata.thumbnail,productdata.min_qty, productdata.unit_price, "In Stock")} className="btn btn-compare" id="addtowish1"><i className="lar la-heart mr-1" ></i></Link>
                                                                        :
                                                                        <Link to="/cart" className="btn btn-compare" id="viewwishlist1"><i className="las la-heart mr-1" ></i></Link>
                                                                    }
                                                                    {!CartItems(productdata.id) ?
                                                                        <Link to="#" onClick={() => Productaddcart(productdata.id, productdata.name, productdata.thumbnail,productdata.min_qty,productdata.unit_price, "In Stock")} className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="addtocard1"><i className="las la-shopping-cart mr-1" /></Link>
                                                                        :
                                                                        <Link to="/cart" className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="viewcart1"><i className="las la-cart-plus mr-1" /></Link>

                                                                    }
                                                                    <Link to="#" onClick={() => onClickQuickView(productdata)} className="btn btn-view" id="quickview1"><i className="las la-eye" /></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                        ))}
                                    </OwlCarousel>
                                </TabPane>
                                {/* <TabPane className="fade show" tabId="2">
                                    <OwlCarousel
                                        className="owl-carousel no-pb owl-2"
                                        {...options}
                                        navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}

                                    >
                                        {Productlist.map((productdata, index) => (
                                            (index > 3 && index < 9) ?
                                                <div className="item" key={index}>
                                                    <div className="card product-card">
                                                        {!WishlistItems(productdata.id) ?
                                                            <Link to="#" onClick={() => Productaddwishlist(productdata.id, productdata.name, productdata.pictures[0], 1, productdata.salePrice, "In Stock")} className="btn-wishlist btn-sm" id="addtowish"><i className="lar la-heart" /></Link>
                                                            :
                                                            <Link to="/cart" className="btn-wishlist btn-sm" id="viewwishlist"><i className="las la-heart" /></Link>
                                                        }
                                                        <Link className="card-img-hover d-block" to={`/product-single-left/${productdata.category}/${productdata.id}`}>
                                                            <img className="card-img-top card-img-back" src={require(`../../assets/images/${productdata.pictures[0]}`).default} alt="..." />
                                                            <img className="card-img-top card-img-front" src={require(`../../assets/images/${productdata.pictures[1]}`).default} alt="..." />
                                                        </Link>
                                                        <div className="card-info">
                                                            <div className="card-body">
                                                                <div className="product-title"><Link to="/product-single" className="link-title">{productdata.name}</Link>
                                                                </div>
                                                                <div className="mt-1"> <span className="product-price"><del className="text-muted">$ {productdata.price}</del> $ {productdata.salePrice}</span>
                                                                    <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer bg-transparent border-0">
                                                                <div className="product-link d-flex align-items-center justify-content-center">
                                                                    {!WishlistItems(productdata.id) ?
                                                                        <Link to="#" onClick={() => Productaddwishlist(productdata.id, productdata.name, productdata.pictures[0], 1, productdata.salePrice, "In Stock")} className="btn btn-compare" id="addtowish1"><i className="lar la-heart mr-1" ></i></Link>
                                                                        :
                                                                        <Link to="/cart" className="btn btn-compare" id="viewwishlist1"><i className="las la-heart mr-1" ></i></Link>
                                                                    }
                                                                    {!CartItems(productdata.id) ?
                                                                        <Link to="#" onClick={() => Productaddcart(productdata.id, productdata.name, productdata.pictures[0], 1, productdata.salePrice, "In Stock")} className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="addtocard1"><i className="las la-shopping-cart mr-1" /></Link>
                                                                        :
                                                                        <Link to="/cart" className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="viewcart1"><i className="las la-cart-plus mr-1" /></Link>

                                                                    }
                                                                    <Link to="#" onClick={() => this.onClickQuickView(productdata)} className="btn btn-view" id="quickview1"><i className="las la-eye" /></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : null
                                        ))}
                                    </OwlCarousel>
                                </TabPane>
                                <TabPane className="fade show" tabId="3">
                                    <OwlCarousel
                                        className="owl-carousel no-pb owl-2"
                                        {...options}
                                        navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}

                                    >
                                        {Productlist.map((productdata, index) => (
                                            (index > 2 && index < 7) ?
                                                <div className="item" key={index}>
                                                    <div className="card product-card">
                                                        {!WishlistItems(productdata.id) ?
                                                            <Link to="#" onClick={() => Productaddwishlist(productdata.id, productdata.name, productdata.pictures[0], 1, productdata.salePrice, "In Stock")} className="btn-wishlist btn-sm" id="addtowish"><i className="lar la-heart" /></Link>
                                                            :
                                                            <Link to="/cart" className="btn-wishlist btn-sm" id="viewwishlist"><i className="las la-heart" /></Link>
                                                        }
                                                        <Link className="card-img-hover d-block" to={`/product-single-left/${productdata.category}/${productdata.id}`}>
                                                            <img className="card-img-top card-img-back" src={require(`../../assets/images/${productdata.pictures[0]}`).default} alt="..." />
                                                            <img className="card-img-top card-img-front" src={require(`../../assets/images/${productdata.pictures[1]}`).default} alt="..." />
                                                        </Link>
                                                        <div className="card-info">
                                                            <div className="card-body">
                                                                <div className="product-title"><Link to="/product-single" className="link-title">{productdata.name}</Link>
                                                                </div>
                                                                <div className="mt-1"> <span className="product-price"><del className="text-muted">$ {productdata.price}</del> $ {productdata.salePrice}</span>
                                                                    <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer bg-transparent border-0">
                                                                <div className="product-link d-flex align-items-center justify-content-center">
                                                                    {!WishlistItems(productdata.id) ?
                                                                        <Link to="#" onClick={() => Productaddwishlist(productdata.id, productdata.name, productdata.pictures[0], 1, productdata.salePrice, "In Stock")} className="btn btn-compare" id="addtowish1"><i className="lar la-heart mr-1" ></i></Link>
                                                                        :
                                                                        <Link to="/cart" className="btn btn-compare" id="viewwishlist1"><i className="las la-heart mr-1" ></i></Link>
                                                                    }
                                                                    {!CartItems(productdata.id) ?
                                                                        <Link to="#" onClick={() => Productaddcart(productdata.id, productdata.name, productdata.pictures[0], 1, productdata.salePrice, "In Stock")} className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="addtocard1"><i className="las la-shopping-cart mr-1" /></Link>
                                                                        :
                                                                        <Link to="/cart" className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="viewcart1"><i className="las la-cart-plus mr-1" /></Link>

                                                                    }
                                                                    <Link to="#" onClick={() => this.onClickQuickView(productdata)} className="btn btn-view" id="quickview1"><i className="las la-eye" /></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : null
                                        ))}
                                    </OwlCarousel>
                                </TabPane> */}
                            </TabContent>
                        </div>
                    </Col>
                </Row>
            </div>
            <Modal isOpen={modelview} toggle={modelview} className="view-modal">

                <ModalHeader className="border-bottom-0 pb-0">
                    <Button className="close" color="danger" onClick={() => quickview()} ><span aria-hidden="true">×</span></Button>
                </ModalHeader>
                <ModalBody>
                    <Row className="align-items-center">
                        <div className="col-lg-5 col-12">
                            {/* <img className="img-fluid rounded" src={require(`../../assets/images/${viewproduct.pictures[0]}`).default} alt="" /> */}
                            {(viewproduct.pictures && viewproduct.pictures.length > 0) ?
                                <img className="img-fluid rounded" src={require(`../../assets/images/${viewproduct.pictures[0]}`).default} alt="" />
                                // <img className="card-img-top card-img-back" src={require(`../../assets/images/${viewproduct.pictures[0]}`).default} alt="..." />
                                : null}
                        </div>
                        <div className="col-lg-7 col-12 mt-5 mt-lg-0">
                            <div className="product-details">
                                <h3 className="mb-0">{viewproduct.name}</h3>
                                <div className="star-rating mb-4"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                </div> <span className="product-price h4">${viewproduct.salePrice}<del className="text-muted h6">${viewproduct.price}</del></span>
                                <ul className="list-unstyled my-4">
                                    <li className="mb-2">Availibility: <span className="text-muted"> In Stock</span>
                                    </li>
                                    <li>Categories :<span className="text-muted"> {viewproduct.category}</span>
                                    </li>
                                </ul>
                                <p className="mb-4">{viewproduct.description}</p>
                                <div className="d-sm-flex align-items-center mb-5">
                                    <div className="d-flex align-items-center mr-sm-4">
                                        <button className="btn-product btn-product-up"> <i className="las la-minus" />
                                        </button>
                                        <input className="form-product" type="number" name="form-product" defaultValue={1} />
                                        <button className="btn-product btn-product-down"> <i className="las la-plus" />
                                        </button>
                                    </div>
                                    <select className="custom-select mt-3 mt-sm-0" id="inputGroupSelect01">
                                        <option selected>Size</option>
                                        {(viewproduct.size) && viewproduct.size.map((sizes, index) => {
                                            return (<option key={index}>{sizes}</option>)
                                        }
                                        )}
                                    </select>
                                    <div className="d-flex text-center ml-sm-4 mt-3 mt-sm-0">
                                        {(viewproduct.size) && viewproduct.colors.map((color, index) => {
                                            return (
                                                <div className="form-check pl-0 mr-3">
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
                                    {!WishlistItems(viewproduct.id) ?
                                        <Link to="#" onClick={() => Productaddwishlist(viewproduct.id, viewproduct.name, viewproduct.pictures[0], 1, viewproduct.salePrice, "In Stock")} className="btn btn-animated btn-dark"><i className="lar la-heart mr-1" />Add To Wishlist</Link>
                                        :
                                        <Link to="/wishlist" className="btn btn-animated btn-dark" ><i className="lar la-heart mr-1" />View Wishlist </Link>
                                    }
                                    {!CartItems(viewproduct.id) ?
                                        <Link to="#" onClick={() => Productaddcart(viewproduct.id, viewproduct.name, viewproduct.pictures[0], 1, viewproduct.salePrice, "In Stock")} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Add To Cart</Link>
                                        :
                                        <Link to="/cart" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" id="viewcart1"><i className="las la-shopping-cart mr-1" />View Cart</Link>

                                    }

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

        </>
    )
}

export default ourProduct2