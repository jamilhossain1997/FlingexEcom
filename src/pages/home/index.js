import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
// import Herosection from '../../widgets/herosection/herosection';
import Processstep from '../../widgets/home1/processstep';
import Newcollection from '../../widgets/home1/newcollection';
import CommingSoonCounter from '../../widgets/common/counter';
// import Ourproduct from '../../widgets/home1/ourproduct';
import Newsletter1 from '../../widgets/home1/newsletter1';
import Productbanner from '../../widgets/home1/productbanner';
import Clientlogo from '../../widgets/home1/clientlogo';
import Blogcart from '../../widgets/blog/blogcart';
import Instafeed from '../../widgets/aboutus/instafeed';
import OurProduct2 from '../../widgets/home1/ourProduct2';
import HomeCatgoryPro from '../../widgets/home1/homeCatgoryPro';

// function Component
import Herosection7 from '../../widgets/herosection/herosection7';
import Fashiongallery from '../../widgets/home1/fashiongallery';
import HomeCatPro from '../../widgets/home1/homeCatPro';
import FeaturedProduct from '../../widgets/home1/featuredProduct';
import Brand from '../../widgets/home1/brand';
import LatestProduct from '../../widgets/home1/latestProduct';
import Categories from '../../widgets/home1/Categories';
import Newarrivedelectonic from '../../widgets/home1/newarrivedelectonic';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Test from '../shop/product/test';


class index extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <>
        {/* <Helmet>
           <title>Hello jamil</title>
        </Helmet> */}
        <HelmetProvider>
          <Herosection7 />

          <Helmet>
            <title>Home-Pages</title>
          </Helmet>
          <div className="page-content">

            <Categories />
            <div className="container-fluid mb-1">
              <FeaturedProduct />
            </div>


            <section>
              <div className="container-fluid px-lg-8">

                <HomeCatgoryPro />
              </div>
            </section>
            {/*product end*/}

            {/*product start*/}

            <div className="container-fluid mb-1">
              <LatestProduct />
            </div>

            {/* <div className="container mb-3">
              <Newarrivedelectonic />
            </div> */}
          </div>
        </HelmetProvider>
      </>
    );
  }
}

export default index;