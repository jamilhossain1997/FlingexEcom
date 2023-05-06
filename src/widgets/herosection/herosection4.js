import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
window.fn = OwlCarousel;

class Herosection4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        loop: true,
        dots: false,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      },
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <section className="banner pos-r p-0 mt-5">
        <Container>
          <Row>
            <Col lg={3}>
              <nav className="navbar navbar-expand-lg navbar-light categories d-block shadow-sm">
                <button className="navbar-toggler d-flex align-items-center text-uppercase" type="button" data-toggle="collapse" data-target="#categoriesDropdown" aria-controls="categoriesDropdown" aria-expanded="false" aria-label="Toggle navigation"> <i className="las la-stream" />Categories</button>
                <div className="collapse navbar-collapse" id="categoriesDropdown">
                  <ul className="navbar-nav d-block w-100">
                    <li className="nav-item"> <Link className="nav-link" to="#">Men</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Women</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Kids</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Accessories</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Clothing</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Bags</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Footwear</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Watches</Link>
                    </li>
                    <li className="nav-item"> <Link className="nav-link" to="#">Jewellery</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </Col>
            <Col lg={9}>

            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Herosection4;

