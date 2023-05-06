import React, { Component } from 'react';
import navlink from '../../api/navlinks';
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap'
import Headertop from './siteheader/header-top';
import Headerlogo from './siteheader/header-logo';
import imgUrl from '../../api/baseUrl';
import apiClient from '../../api/http-common';
import Userheader from './siteheader/userheader';
import Brandheader from './siteheader/brandheader';
import Categoryheader from './siteheader/categoryheader';



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            cartview: false,
            loader: true,
            logo: []
        }
        this.cartview = this.cartview.bind(this)
        this.GetCartItems = this.GetCartItems.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.handleScroll);
        apiClient.get(`/v1/company-info`)
            .then(res => {
                const logo = res.data;
                // console.log(res.data);
                this.setState({ logo: logo });
            })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    GetCartItems() {
        return JSON.parse(localStorage.getItem("CartProduct"));
    }
    RemoveItem = (Index) => {
        var CartValue = JSON.parse(localStorage.getItem("CartProduct"));
        CartValue = CartValue.slice(0, Index).concat(CartValue.slice(Index + 1, CartValue.length));
        localStorage.removeItem("CartProduct");
        localStorage.setItem("CartProduct", JSON.stringify(CartValue));
    }
    cartview() {
        this.setState(prevState => ({
            cartview: !prevState.cartview
        }));
    }
    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    handleClick(event) {
        var elems = document.querySelectorAll(".childsubmenu");
        [].forEach.call(elems, function (el) {
            el.classList.remove("show");
        });
    }
    handleScroll() {

        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        if (scrollTop > 100) {
            this.setState({
                visible: true
            });
        }
        else {
            this.setState({
                visible: false
            });
        }

    }


    render() {
        const { visible } = this.state;
        if (this.state.loader == true) {
            setTimeout(function () {
                this.setState({ loader: false });
            }.bind(this), 2000);
        }

        const convert = 0.011904761904762;
        return (
            <>
                {(this.state.loader == false) ?
                    <>
                        <header className="site-header mb-3">
                            <Headertop />
                            <Headerlogo />
                            <div id="header-wrap" className={`${(visible) ? "shadow-sm fixed-header " : "shadow-sm"}`} >
                                <Container>
                                    <Row>
                                        <Col>
                                            <Navbar className="navbar-expand-lg navbar-light position-static">
                                                <Link className="navbar-brand logo d-lg-none" to="/">
                                                    <img className="img-fluid" src={`${imgUrl}storage/app/public/company/${this.state.logo.value}`} alt="hello" />
                                                </Link>
                                                <NavbarToggler onClick={this.toggle} />
                                                <Collapse isOpen={this.state.isOpen} className="navbar-collapse" navbar>
                                                    <Nav className="navbar-nav" navbar>
                                                        <NavItem>
                                                            <NavLink tag={Link} to="/">Home</NavLink>
                                                        </NavItem>
                                                        <Categoryheader />
                                                        <Brandheader />

                                                        <NavItem>
                                                            <NavLink href="http://admin.sajerbela.com/seller/auth/login" target="_blank">Seller</NavLink>
                                                        </NavItem>

                                                        <NavItem>
                                                            <NavLink tag={Link} to="/discontproduct">Discount Product</NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </Collapse>
                                                <div className="right-nav align-items-center d-flex justify-content-end">
                                                    {
                                                        localStorage.getItem('token') ?
                                                            <Userheader /> :
                                                            <Link to="/sign-in" className="mr-1 mr-sm-3"><i className="las la-user-alt" /></Link>
                                                    }

                                                    <Link className="mr-3 d-none d-sm-inline" to="/wishlist"><i className="lar la-heart" /></Link>
                                                    <div>
                                                        <Link className="d-flex align-items-center" to="#" id="header-cart-btn" onClick={this.cartview} >
                                                            {(this.GetCartItems() != null && this.GetCartItems().length > 0) ?
                                                                <>
                                                                    <span className="bg-white px-2 py-1 shadow-sm rounded" data-cart-items={this.GetCartItems().length}>
                                                                        <i className="las la-shopping-cart" />
                                                                    </span>
                                                                    <div className="ml-4 d-none d-md-block"> <small className="d-block text-muted">My Cart</small>
                                                                        <span className="text-dark">{this.GetCartItems().length} Items - ৳{Math.round(this.GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}</span>
                                                                    </div>
                                                                </>
                                                                :
                                                                <span className="bg-white px-2 py-1 shadow-sm rounded" data-cart-items={0}>
                                                                    <i className="las la-shopping-cart" />
                                                                </span>}

                                                        </Link>
                                                    </div>
                                                </div>
                                            </Navbar>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </header>
                        <Modal isOpen={this.state.cartview} toggle={this.cartview} className="cart-modal">
                            <ModalHeader toggle={this.cartview}>Your Cart ({this.GetCartItems()?.length})</ModalHeader>
                            <ModalBody>
                                {(this.GetCartItems() != null && this.GetCartItems().length > 0) ?
                                    <>
                                        {this.GetCartItems().map((CartItem, index) => (
                                            <>
                                                <div>
                                                    <div className="row align-items-center">
                                                        <div className="col-5 d-flex align-items-center">
                                                            <div className="mr-4">
                                                                <Link type="submit" className="btn btn-primary btn-sm" onClick={() => this.RemoveItem(index)}><i className="las la-times" />
                                                                </Link>
                                                            </div>
                                                            {/* Image */}
                                                            <a href="">
                                                                <img className="img-fluid" src={`${imgUrl}storage/app/public/product/thumbnail/${CartItem.ProductImage}`} alt="hello" />
                                                            </a>
                                                            {/* src={`http://127.0.0.1:8000/storage/product/${productdata.images[0]}`} alt="hello" */}
                                                        </div>
                                                        <div className="col-7">
                                                            {/* Title */}
                                                            <h6><a className="link-title" href="">{CartItem.ProductName}</a></h6>
                                                            <div className="product-meta"><span className="mr-2 text-primary">{Math.round((CartItem.Rate * CartItem.Qty).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}</span><span className="text-muted">x {CartItem.Qty}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="my-5" />
                                            </>
                                        ))}


                                        <div className="d-flex justify-content-between align-items-center mb-8"> <span className="text-muted">Subtotal:</span>  <span className="text-dark">${this.GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span>
                                        </div >

                                        <Link to="/cart" toggle={this.cartview} className="btn btn-primary btn-animated mr-2"><i className="las la-shopping-cart mr-1" />View Cart</Link>

                                        <Link to="/checkout" className="btn btn-dark"><i className="las la-money-check mr-1" />Continue To Checkout</Link>
                                    </>
                                    :
                                    <div>
                                        <div className="row align-items-center">
                                            <h3 className="mb-4">Your cart is Currently Empty.</h3>
                                        </div>
                                    </div>
                                }
                            </ModalBody>
                        </Modal>
                    </>
                    :
                    <div id="ht-preloader">
                        <div className="loader clear-loader">
                            <img className="img-fluid" src={require(`../../assets/images/loader.gif`).default} alt="" />
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default Header;