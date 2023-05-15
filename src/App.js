import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// import Footer from './layout/footer/footer';
import Footer1 from './layout/footer/footer1';
import Header from './layout/header/header';

import './App.css';
import './vendor.js';

import index from './pages/home';
// import blogcart from './pages/blog/blogcart';
// import bloglist1 from './pages/blog/bloglist1';
// import bloglist2 from './pages/blog/bloglist2';
// import blogsingle from './pages/blog/blogsingle';
import contactus from './pages/contact/contactus';
import login from './pages/account/login';
// import login2 from './pages/account/login2';
import singup from './pages/account/singup';
import forgotpassword from './pages/account/forgot-password';
// import about from './pages/common/about';
// import privacypolicy from './pages/common/privacy-policy';
// import termcondition from './pages/common/term-condition';
// import faq from './pages/common/faq';
import commingsoon from './pages/common/comming-soon';
import pagenotfound from './pages/common/page-not-found';
import leftsidebar from './pages/shop/layout/grid/leftsidebar';
import { getProducts } from './actions';
import { connect } from 'react-redux';
import rightsidebar from './pages/shop/layout/grid/rightsidebar';
import nosidebar from './pages/shop/layout/grid/nosidebar';
import fullsidebar from './pages/shop/layout/grid/fullsidebar';
import listleftsidebar from './pages/shop/layout/list/listleftsidebar';
import listfullsidebar from './pages/shop/layout/list/listfullsidebar';
import listrightsidebar from './pages/shop/layout/list/listrightsidebar';
import listnosidebar from './pages/shop/layout/list/listnosidebar';
import productleft from './pages/shop/product/productleft';
import productright from './pages/shop/product/productright';
import cart from './pages/shop/cart';
import checkout from './pages/shop/checkout';
import ordercomplate from './pages/shop/ordercomplate';
import wishlist from './pages/shop/wishlist';
import Scrolltop from './layout/back-to-top';
import productsingle from './pages/shop/product/productsingle';
import Checkoutdetails from './pages/shop/checkoutdetails';
import OrderView from './pages/account/orderView';
import SearchView from './pages/shop/layout/grid/SearchView';
import OtpLogin from './pages/account/OTP-LOGIN/otpLogin';
import Otpset from './pages/account/OTP-LOGIN/otpset';
import userProfile from './pages/account/User/userProfile';
// import Invoice from './pages/account/User/invoice';
// import OneStepCheck from './pages/shop/product/oneStepCheck';
import PriceSearch from './pages/shop/layout/grid/PriceSearch';

class App extends React.Component {

  constructor(props) {
    super(props)
  }
  UNSAFE_componentWillMount() {
    this.props.getProducts();
  }

  getUrl(pathname) {
    let pathArray = pathname.split('/');
    return `/${pathArray[1]}` === '/coming-soon' ? true : `/${pathArray[1]}` === '/page-not-found' ? true : false;
  }
  render() {
    const { location } = this.props;
    return (
      <Fragment>
        {
          this.getUrl(location.pathname) ?
            <Switch>
              <Route path="/coming-soon" component={commingsoon} />
              <Route path="/page-not-found" component={pagenotfound} />
            </Switch>
            :
            <div className="page-wrapper">
              <Header />
              <Switch>
                <Route exact path="/" component={index} />
                <Route path="/Search" component={SearchView} />
                <Route path="/otpLogin" component={OtpLogin} />
                <Route path="/Otpset" component={Otpset} />
                <Route path="/userProfile" component={userProfile} />
                {/* <Route path="/invoice/:id" component={Invoice} /> */}
                {/* <Route path="/OneStepCheck" component={OneStepCheck} /> */}
                <Route path="/PriceSearch" component={PriceSearch} />


                {/* Blog Pages */}
                {/* <Route path="/blog-card" component={blogcart} />
                <Route path="/blog-listing-1" component={bloglist1} />
                <Route path="/blog-listing-2" component={bloglist2} />
                <Route path="/blog-single" component={blogsingle} /> */}

                {/* Contact Pages */}
                {/* <Route path="/contact-us" component={contactus} /> */}

                {/* Account Pages */}
                <Route path="/sign-in" component={login} />
                {/* <Route path="/sign-in-1" component={login2} /> */}
                <Route path="/sign-up" component={singup} />
                <Route path="/forgot-password" component={forgotpassword} />

                {/* Utilitie Pages */}
                {/* <Route path="/about-us" component={about} />
                <Route path="/faq" component={faq} />
                <Route path="/privacy-policy" component={privacypolicy} />
                <Route path="/term-condition" component={termcondition} /> */}

                {/* Shop Pages */}
                <Route path="/grid-left-sidebar/:id" component={leftsidebar} />
                {/* <Route path="/grid-right-sidebar" component={rightsidebar} /> */}
                <Route path="/category/:id" component={nosidebar} />
                <Route path="/discontproduct" component={fullsidebar} />
                {/* <Route path="/list-left-sidebar" component={listleftsidebar} />
                <Route path="/list-right-sidebar" component={listrightsidebar} />
                <Route path="/list-no-sidebar" component={listnosidebar} />
                <Route path="/list-full-sidebar" component={listfullsidebar} /> */}

                <Route path={`/product-single-left/:slug`} component={productleft} />
                <Route path={`/product-single/:slug`} component={productsingle} />
                {/* <Route path={`/product-single-right/:category/:id`} component={productright} /> */}
                <Route path="/cart" component={cart} />
                <Route path="/wishlist" component={wishlist} />
                <Route path="/checkout" component={checkout} />
                <Route path="/order-complate" component={ordercomplate} />
                <Route path="/checkoutdetails" component={Checkoutdetails} />
                <Route path="/orderVioew" component={OrderView} />
                <Route path="*" component={pagenotfound} />
              </Switch>
              <Footer1 />
              <Scrolltop />
            </div>
        }
      </Fragment>
    );
  }
}

const AppMapStateToProps = state => {
  return {
    products: state.data.products
  };
};

const AppMapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch(getProducts());
    }
  };
};


export default connect(AppMapStateToProps, AppMapDispatchToProps)(withRouter(App))
// export default (withRouter(App))

