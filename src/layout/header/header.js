import React, { Component } from 'react';
// import navlink from '../../api/navlinks';
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
// import Headertop from './siteheader/header-top';
import Headerlogo from './siteheader/header-logo';
import imgUrl from '../../api/baseUrl';
import apiClient from '../../api/http-common';
import Userheader from './siteheader/userheader';
import Brandheader from './siteheader/brandheader';
import Categoryheader from './siteheader/categoryheader';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            cartview: false,
            show: false,
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



    removeElementLocalStorage = (ProductID) => {
        let elements = JSON.parse(localStorage.getItem("CartProduct"));
        elements = elements.filter(element => element.ProductID !== ProductID);
        localStorage.setItem('CartProduct', JSON.stringify(elements));
        toast.success("Item Remove");
    };

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
        const convert = 0.011904761904762;
        return (
            <>
                {/* <ToastContainer autoClose={5000} /> */}
                <HelmetProvider>
                    <Helmet>
                        <meta property="og:image" content="https://admin.sajerbela.com/storage/app/public/company/2023-03-31-6426dc9918aaa.png" />
                        <meta property="og:url" content="https://sajerbela.com/" />


                        <meta property="twitter:card" content="https://admin.sajerbela.com/storage/app/public/company/2023-03-31-6426dc9918aaa.png" />
                        <meta property="twitter:title" content="Welcome To Sajer Bela Home" />
                        <meta property="twitter:url" content="https://sajerbela.com/" />
                        <meta
                            property="twitter:description"
                            content="<p>বিসমিল্লাহির রাহমানির রাহিম<br />
ব্যত"
                        />
                        <meta name="facebook-domain-verification" content="ys1347xan857sapi97hdpyloyb1ppr" />
                    </Helmet>
                    <>
                        <header className="site-header">
                            {/* <Headertop /> */}
                            <Headerlogo />
                            <div id="header-wrap" className={`${(visible) ? "shadow-sm fixed-header " : "shadow-sm"}`} >
                                <Container fluid>
                                    <Row>
                                        <Col>
                                            <Navbar className="navbar-expand-lg navbar-light position-static navHead" >
                                                <Link className="navbar-brand logo d-lg-none" to="/">
                                                    <img className="img-fluid" src={`${imgUrl}storage/app/public/company/${this.state.logo.value}`} alt="hello" style={{ height: `41px` }} />
                                                </Link>
                                                <NavbarToggler onClick={this.toggle} />
                                                <Collapse isOpen={this.state.isOpen} className="navbar-collapse" navbar>
                                                    <Nav className="navbar-nav" navbar>
                                                        {/* <NavItem onClick={this.toggle}>
                                                        <NavLink tag={Link} to="/">Home</NavLink>
                                                    </NavItem> */}

                                                        <Categoryheader />
                                                        <Brandheader toggle={this.toggle} />
                                                        {/* <NavItem onClick={this.toggle}>
                                                            <NavLink tag={Link} to="/campaign" style={{ textTransform: `uppercase` }}>Campaign</NavLink>
                                                        </NavItem> */}

                                                        <NavItem onClick={this.toggle}>
                                                            <NavLink tag={Link} to="/discontproduct" style={{ textTransform: `uppercase` }}>Discount Product</NavLink>
                                                        </NavItem>
                                                        {/* <NavItem>
                                                            <NavLink tag={Link} to="/catgory/530" style={{ textTransform: `uppercase` }}>Video Shopping</NavLink>
                                                        </NavItem> */}
                                                        <NavItem>
                                                            <UncontrolledDropdown nav inNavbar >
                                                                <DropdownToggle nav caret className="dropdown-item" style={{ textTransform: `uppercase` }}>
                                                                    Seller
                                                                </DropdownToggle>
                                                                <DropdownMenu className="childsubmenu" style={{ overflowY: 'scroll', maxHeight: "200px" }}>
                                                                    <DropdownItem href="http://admin.sajerbela.com/shop/apply" target="_blank">Become a seller
                                                                    </DropdownItem>
                                                                    <DropdownItem href="http://admin.sajerbela.com/seller/auth/login" target="_blank">Seller Login
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </UncontrolledDropdown>
                                                            {/* <NavLink href="http://admin.sajerbela.com/seller/auth/login" target="_blank">Seller</NavLink> */}
                                                        </NavItem>
                                                    </Nav>
                                                </Collapse>
                                                <div className="right-nav align-items-center d-flex justify-content-end">
                                                    {/* {
                                                        localStorage.getItem('token') ?
                                                            <Userheader /> :
                                                            <Link to="/otpLogin" className="mr-1 mr-sm-3"><i className="las la-user-alt" /></Link>
                                                    } */}

                                                    <Link to="/otpLogin" className="mr-1 mr-sm-3"><i className="las la-user-alt" /></Link>
                                                    <div>
                                                        <Link className="d-flex align-items-center" to="#" id="header-cart-btn" onClick={this.cartview} >
                                                            {(this.GetCartItems() != null && this.GetCartItems().length > 0) ?
                                                                <>
                                                                    <span className="bg-white px-2 py-1 shadow-sm rounded" data-cart-items={this.GetCartItems().length}>
                                                                        <i className="las la-shopping-cart" />
                                                                    </span>
                                                                    <div className="ml-3 d-none d-md-block"> <small className="d-block text-muted">My Cart</small>
                                                                        <span className="text-dark">৳{Math.round(this.GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}</span>
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
                                                <div key={index}>
                                                    <div className="row align-items-center">
                                                        <div className="col-5 d-flex align-items-center">
                                                            <div className="mr-4">
                                                                <Link type="submit" className="btn btn-info btn-sm" onClick={() => this.removeElementLocalStorage(CartItem.ProductID)}><i className="las la-times" />
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
                                                            {/* {Math.round(CartItem.Discount / convert)} */}
                                                            <div className="product-meta"><span className="mr-2 text-primary"><strong style={{ fontSize: `13px` }}>Discount-৳{Math.round((CartItem.Discount * CartItem.Qty).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}</strong></span>
                                                            </div>
                                                            <div className="product-meta"><span className="mr-2 text-primary">৳{Math.round((CartItem.Rate * CartItem.Qty).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}</span><span className="text-muted">x {CartItem.Qty}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="my-5" />
                                            </>
                                        ))}


                                        <div className="d-flex justify-content-between align-items-center mb-8"> <span className="text-muted">Subtotal:</span>  <span className="text-dark">৳{Math.round(this.GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}</span>
                                        </div >
                                        <Link to="/OneStepCheck">
                                            <button className="btn btn-primary btn-lg btn-block btn-animated mr-2" onClick={this.cartview}>
                                                <i className="las la-shopping-cart mr-1" />Checkout
                                            </button>
                                        </Link>

                                        {/* <Link toggle={this.cartview} to="/checkout" className="btn btn-dark"><i className="las la-money-check mr-1" />Continue To Checkout</Link> */}
                                    </>
                                    :
                                    <div>
                                        {/* <div className="row align-items-center">
                                        </div> */}
                                        <h5 className="mb-4 text-center">Your cart is Currently Empty.</h5>
                                    </div>
                                }
                            </ModalBody>
                        </Modal>
                    </>
                </HelmetProvider>
            </>
        );
    }
}

export default Header;