// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import OwlCarousel from 'react-owl-carousel';
import Pageheading from '../../../widgets/pageheading';
import apiClient from '../../../api/http-common';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import imgUrl from '../../../api/baseUrl';
import RelatedProduct from './relatedProduct';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Helmet, HelmetProvider } from 'react-helmet-async';
window.fn = OwlCarousel;



const productsingle = () => {
  const { slug } = useParams();
  // console.log(props);

  // console.log(slug);

  const [SelectedTab, setSelectedTab] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [SelectedProduct, setSelectedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(1);


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

  useEffect(() => {

    apiClient.get(`/v1/products/details/${slug}`)
      .then(function (response) {
        // console.log(response.data)
        setSelectedProduct(response.data)
        setIsLoading(false)
      });
  }, [SelectedProduct, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



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
  function toggle(tab) {
    if (SelectedTab !== tab) {
      setSelectedTab(tab)
    }
  }


  const productPrice = () => {
    let discount = 0
    if (SelectedProduct.discount_type == 'percent') {
      discount = (SelectedProduct.unit_price * SelectedProduct.discount) / 100
    }
    if (SelectedProduct.discount_type == 'flat') {
      discount = SelectedProduct.discount
    }
    return discount;
  }
  const convert = 0.011904761904762;

  if (isLoading) return (
    <>
      <Container>
        <Row>
          <div className="col-lg-6 col-12">
            <Skeleton height={500} />
          </div>
          <div className="col-lg-6 col-12 mt-5 mt-lg-0">
            <Skeleton count={5} height={123} />
          </div>
        </Row>
      </Container>

    </>

  )
  return (

    <>
      <HelmetProvider>
        <ToastContainer autoClose={5000} />
        <Helmet>
          <title>Product-Single-pages</title>
        </Helmet>
        <div className="page-content">
          <section>
            {
              SelectedProduct ?
                <Container>
                  <Row>
                    <div className="col-lg-6 col-12">
                      <Carousel>
                        {SelectedProduct?.images?.map((image, index) => {
                          return (
                            <div className="item" key={index}>
                              {/* <img className="card-img-top card-img-back" src={`${imgUrl}storage/product/${SelectedProduct.images[0]}`} alt="hello" /> */}
                              <img className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/${image}`} alt="hello" />
                            </div>
                          )
                        })}
                      </Carousel>
                    </div>
                    <div className="col-lg-6 col-12 mt-5 mt-lg-0">
                      <div className="product-details">
                        <h3 className="mb-0">
                          {SelectedProduct.name}
                        </h3>
                        <div className="star-rating mb-4"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                        </div>
                        <span className="product-price h4">
                          <span className="product-price">

                            {
                              SelectedProduct.discount > 0 ? SelectedProduct?.discount_type == 'percent' ? <> Discount:{Math.round((SelectedProduct.discount))}%</> : null : null
                            }

                            {
                              SelectedProduct.discount > 0 ? SelectedProduct?.discount_type == 'flat' ? <> Discount:৳{Math.round((SelectedProduct.discount / convert))}</> : null : null
                            }
                          </span><br />
                          <span className="product-price">
                            {
                              SelectedProduct.discount > 0 ? SelectedProduct?.discount_type == 'percent' ? <>৳{(Math.round(SelectedProduct?.unit_price / convert, 2)) - (Math.round(((SelectedProduct?.unit_price / convert * SelectedProduct?.discount)), 2) / 100)}</> : <>৳{(Math.round(SelectedProduct?.unit_price / convert, 2)) - (Math.round((SelectedProduct?.discount) / convert, 2))}</> : <>৳{Math.round(SelectedProduct?.unit_price / convert, 2)}</>
                            }
                            <span>
                              {
                                SelectedProduct?.discount > 0 ? <del className="text-muted h6"> ৳{Math.round(SelectedProduct?.unit_price / convert, 2)}</del>
                                  : null
                              }
                            </span>
                            {/* <del className="text-muted">{productdata.unit_price}</del>{productdata.unit_price} */}
                          </span>

                        </span>
                        <ul className="list-unstyled my-4">
                          <li className="mb-2">Availibility: <span className="text-muted"> In Stock({SelectedProduct.current_stock})</span>
                          </li>
                          {/* <li>Categories :<span className="text-muted">  {SelectedProduct.category}</span>
                      </li> */}
                        </ul>
                        <p className="mb-4" ontentEditable='true' dangerouslySetInnerHTML={{ __html: SelectedProduct.details }}></p>
                        <div className="d-sm-flex align-items-center mb-5">
                          <div className="d-flex align-items-center mr-sm-4">
                            <button onClick={() => cart <= 1 ? 1 : setCart(cart - 1)} className="btn-product btn-product-up"> <i className="las la-minus" />
                            </button>

                            <input className="form-product" type="number" name="form-product" Value={cart} />

                            <button onClick={() => setCart(cart + 1) > 0} className="btn-product btn-product-down"> <i className="las la-plus" />
                            </button>
                          </div>
                          {
                            SelectedProduct.variation !== ['']
                              ? <select className="custom-select mt-3 mt-sm-0" id="inputGroupSelect02">
                                {SelectedProduct?.variation?.map((sizes, index) => {
                                  return (<option key={index}>{sizes.type}</option>)
                                }
                                )} </select> : null
                          }

                          <div className="d-flex text-center ml-sm-4 mt-3 mt-sm-0" >
                            {SelectedProduct?.colors?.map((color, index) => {
                              return (
                                <div className="form-check pl-0 mr-3">
                                  <input type="checkbox" value={color} id={`color-filter${index}`} className="form-check-input" checked={selectedColor === color}
                                    onChange={onChangeColor} />
                                  <label className="form-check-label" htmlFor={`color-filter${index}`} style={{ background: color }} />
                                </div>
                              )
                            }
                            )}
                          </div>
                        </div>
                        <div className="d-sm-flex align-items-center mt-5">
                          {
                            SelectedProduct.current_stock > 0 ?

                              <>
                                {!CheckCardItem(SelectedProduct.id) ?
                                  <Link onClick={() => AddToCart(SelectedProduct.id, SelectedProduct.name, SelectedProduct.thumbnail, cart, (SelectedProduct.unit_price - productPrice()), SelectedProduct.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow"><i className="las la-shopping-cart mr-1" />Add To Cart</Link>
                                  :
                                  <Link to="/cart" onClick={() => AddToCart(SelectedProduct.id, SelectedProduct.name, SelectedProduct.thumbnail, cart, (SelectedProduct.unit_price - productPrice()), SelectedProduct.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow"><i className="las la-shopping-cart mr-1" />View Cart</Link>
                                }

                                <Link to="/cart" onClick={() => AddToCart(SelectedProduct.id, SelectedProduct.name, SelectedProduct.thumbnail, cart, (SelectedProduct.unit_price - productPrice()), SelectedProduct.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow"><i className="las la-shopping-cart mr-1" />Buy Now</Link>

                              </>
                              : <Link to="/" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow">Stock Out</Link>
                          }

                          {/* {!CheckWishList(SelectedProduct.id) ?
                        <Link to="#" onClick={() => AddToWishList(SelectedProduct.id, SelectedProduct.name, SelectedProduct.thumbnail, cart, Math.round(cart * SelectedProduct.unit_price, 2)-Math.round(productPrice(), 2), SelectedProduct.current_stock)} className="btn btn-animated btn-dark"> <i className="lar la-heart mr-1" />Add To Wishlist</Link>
                        :
                        <Link to="/wishlist" className="btn btn-animated btn-dark"><i className="lar la-heart mr-1" />View Wishlist</Link>
                      } */}
                        </div>
                        <div className="d-flex align-items-center border-top border-bottom py-4 mt-5">
                          <h6 className="mb-0 mr-4">Share It:</h6>
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
                </Container> : <Skeleton count={5} />
            }

          </section>

          <section className="p-0">
            <Container>
              <Row>
                <Col md={12}>
                  <div className="tab">
                    {/* Nav tabs */}
                    <Nav tabs>
                      <NavItem active>
                        <NavLink className={classnames({ active: SelectedTab === '1' })} onClick={() => { toggle('1'); }} >Description</NavLink>
                      </NavItem>
                      {/* <NavItem>
                        <NavLink className={classnames({ active: SelectedTab === '2' })} onClick={() => { toggle('2'); }}>Additional information</NavLink>
                      </NavItem> */}
                      <NavItem disabled>
                        <NavLink className={classnames({ active: SelectedTab === '3' })} onClick={() => { toggle('3'); }}>Reviews (2)</NavLink>
                      </NavItem>
                    </Nav>
                    {/* Tab panes */}
                    <TabContent activeTab={SelectedTab} className="pt-5 p-0">
                      <TabPane tabId="1" className="fade show" active>
                        <Row className="align-items-center">
                          <div className="col-md-5">
                            <img className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/thumbnail/${SelectedProduct.thumbnail}`} alt="hello" />
                          </div>
                          <div className="col-md-7 mt-5 mt-lg-0">
                            <h3 className="mb-3">{SelectedProduct.name}</h3>
                            <p className="mb-5">{SelectedProduct.details}</p> <Link className="btn btn-primary btn-animated" to="#"><i className="las la-long-arrow-alt-right mr-1" />Read More</Link>
                          </div>
                        </Row>
                      </TabPane>
                      {/* <TabPane tabId="2" className="fade show">
                        <table className="table table-bordered mb-0">
                          <tbody>
                            <tr>
                              <td>Size</td>
                              <td>Small, Medium, Large &amp; Extra Large</td>
                            </tr>
                            <tr>
                              <td>Color</td>
                              <td>Yellow, Red, Blue, Green &amp; Black</td>
                            </tr>
                            <tr>
                              <td>Chest</td>
                              <td>38 inches</td>
                            </tr>
                            <tr>
                              <td>Waist</td>
                              <td>20 cm</td>
                            </tr>
                            <tr>
                              <td>Length</td>
                              <td>35 cm</td>
                            </tr>
                            <tr>
                              <td>Fabric</td>
                              <td>Cotton, Silk &amp; Synthetic</td>
                            </tr>
                            <tr>
                              <td>Warranty</td>
                              <td>6 Months</td>
                            </tr>
                          </tbody>
                        </table>
                      </TabPane> */}
                      <TabPane tabId="3" className="fade show">
                        <Row className="align-items-center">
                          <Col md={6}>
                            <div className="shadow-sm text-center p-5">
                              <h4>Based on 3 Reviews</h4>
                              <h5>Average</h5>
                              <h4>4.0</h4>
                              <h6>(03 Reviews)</h6>
                            </div>
                          </Col>
                          <Col md={6} className="mt-3 mt-lg-0">
                            <div className="rating-list">
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-nowrap mr-3">5 Star</div>
                                <div className="w-100">
                                  <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '90%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                  </div>
                                </div><span className="text-muted ml-3">90%</span>
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-nowrap mr-3">4 Star</div>
                                <div className="w-100">
                                  <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                  </div>
                                </div><span className="text-muted ml-3">60%</span>
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-nowrap mr-3">3 Star</div>
                                <div className="w-100">
                                  <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '40%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                                  </div>
                                </div><span className="text-muted ml-3">40%</span>
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-nowrap mr-3">2 Star</div>
                                <div className="w-100">
                                  <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: '20%' }} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                                  </div>
                                </div><span className="text-muted ml-3">20%</span>
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-nowrap mr-3">1 Star</div>
                                <div className="w-100">
                                  <div className="progress" style={{ height: '5px' }}>
                                    <div className="progress-bar bg-danger" role="progressbar" style={{ width: '10%' }} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                                  </div>
                                </div><span className="text-muted ml-3">10%</span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        {/* <div className="media-holder mt-5">
                          <div className="media d-block d-md-flex">
                            <img className="img-fluid align-self-center rounded mr-md-3 mb-3 mb-md-0" alt="image" src={require(`../../../assets/images/thumbnail/01.jpg`).default} />
                            <div className="media-body">
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0">Ember Lana</h6>
                                <small className="mx-3 text-muted">April 09, 2020</small>
                                <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                </div>
                              </div>
                              <p className="mb-0 mt-3">Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.</p>
                            </div>
                          </div>
                        </div>
                        <div className="media-holder review-list mt-5">
                          <div className="media d-block d-md-flex">
                            <img className="img-fluid align-self-center rounded mr-md-3 mb-3 mb-md-0" alt="image" src={require(`../../../assets/images/thumbnail/02.jpg`).default} />
                            <div className="media-body">
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0">Scott Jones</h6>
                                <small className="mx-3 text-muted">March 15, 2020</small>
                                <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                </div>
                              </div>
                              <p className="mb-0 mt-3">Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.</p>
                            </div>
                          </div>
                        </div>
                        <div className="media-holder review-list mt-5">
                          <div className="media d-block d-md-flex">
                            <img className="img-fluid align-self-center rounded mr-md-3 mb-3 mb-md-0" alt="image" src={require(`../../../assets/images/thumbnail/03.jpg`).default} />
                            <div className="media-body">
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0">Amber Holmes</h6>
                                <small className="mx-3 text-muted">February 26, 2020</small>
                                <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                </div>
                              </div>
                              <p className="mb-0 mt-3">Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi.</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 shadow p-5">
                          <div className="section-title mb-3">
                            <h4>Add a review</h4>
                          </div>
                          <form id="contact-form" className="row" method="post" action="contact.php">
                            <div className="messages" />
                            <div className="form-group col-sm-6">
                              <input id="form_name" type="text" name="name" className="form-control" placeholder="Your Name" required="required" data-error="Name is required." />
                              <div className="help-block with-errors" />
                            </div>
                            <div className="form-group col-sm-6">
                              <input id="form_email" type="email" name="email" className="form-control" placeholder="Your Email Address" required="required" data-error="Valid email is required." />
                              <div className="help-block with-errors" />
                            </div>
                            <div className="form-group clearfix col-12">
                              <select className="custom-select form-control">
                                <option value>Rating -- Select</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                            </div>
                            <div className="form-group col-12">
                              <textarea id="form_message" name="message" className="form-control" placeholder="Write Your Review" rows={4} required="required" data-error="Please,leave us a review." defaultValue={""} />
                              <div className="help-block with-errors" />
                            </div>
                            <Col>
                              <button className="btn btn-primary btn-animated mt-3">Post Review</button>
                            </Col>
                          </form>
                        </div> */}
                      </TabPane>
                    </TabContent>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section>
            <Container>
              <Row className="justify-content-center text-center">
                <Col lg={8} md={10}>
                  <div className="mb-5">
                    <h6 className="text-primary mb-1">
                      — You may also like
                    </h6>
                    <h2 className="mb-0">Related Products</h2>
                  </div>
                </Col>
              </Row>
              <RelatedProduct slug={SelectedProduct.id} />
            </Container>
          </section>

        </div>
      </HelmetProvider>
    </>
  )


}

export default productsingle