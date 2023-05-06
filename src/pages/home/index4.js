import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommingSoonCounter from '../../widgets/common/counter';
import Herosection4 from '../../widgets/herosection/herosection4';
import Newarrived from '../../widgets/home3/newarrived';
import Testimonial1 from '../../widgets/aboutus/testimonial1';
import Brand1 from '../../widgets/aboutus/brand1';
import Blogcart from '../../widgets/blog/blogcart';
import Processstep1 from '../../widgets/home4/processstep1';
import Specialproduct from '../../widgets/home4/specialproduct';
import NewarrivedElectonic from '../../widgets/home4/newarrivedelectonic';
import ElectronicBlog from '../../widgets/blog/electronicblog';


class index4 extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <>
        <Herosection4 />

        {/*body content end*/}
      </>
    );
  }
}

export default index4;