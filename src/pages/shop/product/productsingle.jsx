// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
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
// import ReactPlayer from 'react-player';
import { FacebookEmbed } from 'react-social-media-embed';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import ReactImageMagnify from 'react-image-magnify';
import { Button, message } from 'antd';
window.fn = OwlCarousel;



const productsingle = () => {
  const { slug } = useParams();
  // console.log(props);

  // console.log(slug);

  const [SelectedTab, setSelectedTab] = useState('1');
  const [isActive, setActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [SelectedProduct, setSelectedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(1);

  const [imgShow, setImgShow] = useState('');



  // console.log(imgShow)
  useEffect(() => {
    apiClient.get(`/v1/products/details/${slug}`)
      .then(function (response) {
        setSelectedProduct(response.data)
        setIsLoading(false)
      });
  }, []);

  const options = {
    loop: true,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5
      },
    },
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  function onChangeColor(event) {
    console.log(event.target.value);
    setSelectedColor(event.target.value)
  }

  function onChangeSize(event) {
    console.log(event.target.value);
    setSelectedSize(event.target.value)
  }



  function AddToCart(ProductID, ProductName, ProductImage, Qty, Rate, SelectedColor, SelectedSize, discount, StockStatus) {
    var Cart = JSON.parse(localStorage?.getItem("CartProduct"));
    if (Cart == null)
      Cart = new Array();
    let selectedProduct = Cart.find(product => product.ProductID === ProductID);
    if (selectedProduct == null) {
      Cart.push({ product_id: ProductID, id: ProductID, ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Color: SelectedColor, Size: SelectedSize, Discount: discount, StockStatus: StockStatus });
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


  function toggle(tab) {
    setSelectedTab(tab)
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
  const color = SelectedProduct?.color?.map((color) => color)


  // const [messageApi, contextHolder] = message.useMessage();
  // const info = () => {
  //   messageApi.info('Color Select');
  // };
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
          <meta http-equiv='cache-control' content='no-cache' />
          <meta http-equiv='expires' content='0' />
          <meta http-equiv='pragma' content='no-cache' />
          <meta property="og:title" content={SelectedProduct.name} />
          <meta property="og:description" content="Welcome to the world of women's fashion where style meets comfort. Our online store is your one-stop destination for all the latest fashion trends and must-haves for the modern woman. We believe that fashion should be accessible to everyone, and that's why we bring you an extensive collection of stylish and affordable clothing, footwear, and accessories. From casual everyday outfits to elegant partywear, we have something for every occasion. Whether you're looking for the latest trends or classic staples, we've got you covered. Our collection includes a range of tops, dresses, pants, skirts, and jackets that are perfect for creating endless outfit combinations. You can shop by category or browse our curated collections to find the perfect pieces to suit your personal style. We understand the importance of accessories in completing any look, which is why we offer a wide selection of jewelry, bags, and shoes. Our accessories are designed to complement our clothing, making it easy for you to put together a complete and cohesive outfit. At our online store, we believe in making fashion accessible and affordable, which is why we offer free shipping on all orders. You can shop with confidence, knowing that you're getting high-quality products at unbeatable prices. So what are you waiting for? Browse our collection today and start building your dream wardrobe." />
          <meta property="og:image" content="https://admin.sajerbela.com/storage/app/public/company/2023-03-31-6426dc9918aaa.png" />
          <meta property="og:site_name" content="Sajer Bela" />
          <meta
            property="og:url"
            content="https://sajerbela.com/"
          />
          <title>{SelectedProduct.name}</title>
        </Helmet>

        <section className="p-2">
          {
            SelectedProduct ?
              <Container>
                <Row>

                  <div className="col-lg-6 col-12" style={{ zIndex: `91` }}>
                    {
                      SelectedProduct.video_url ? <>
                        <div style={{ width: `100%`, height: `60%` }} >
                          <FacebookEmbed url={SelectedProduct.video_url} />
                        </div>
                        {/* <ReactPlayer width="500" url={SelectedProduct.video_url} /> */}

                      </> : <>
                        <div className='signalImage' style={{ marginLeft: `75px` }}>
                          {
                            imgShow == '' ?
                              <div className="fluid__image-container mb-2 " style={{ width: `430px` }}>
                                <ReactImageMagnify {...{
                                  className: "image-magnify",
                                  smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: `${imgUrl}storage/app/public/product/${SelectedProduct?.images[0]}`,
                                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                  },
                                  largeImage: {
                                    src: `${imgUrl}storage/app/public/product/${SelectedProduct?.images[0]}`,
                                    width: 1200,
                                    height: 1800
                                  },
                                  enlargedImageContainerDimensions: {
                                    width: '70%',
                                    height: '60%'

                                  },

                                }} />
                              </div> :
                              // <InnerImageZoom style={{ width: `100px` }} className="img-fluid w-60" src={`${imgUrl}storage/app/public/product/${SelectedProduct?.images[0]}`} zoomSrc={`${imgUrl}storage/app/public/product/${SelectedProduct?.images[0]}`} alt="SelectedProduct?.images[0]" /> :
                              // <InnerImageZoom src={`${imgUrl}storage/app/public/product/${imgShow}`} zoomSrc={`${imgUrl}storage/app/public/product/${imgShow}`} alt="hello" />
                              <div className="fluid__image-container mb-2">
                                <ReactImageMagnify {...{
                                  smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: `${imgUrl}storage/app/public/product/${imgShow}`,
                                    sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                  },
                                  largeImage: {
                                    src: `${imgUrl}storage/app/public/product/${imgShow}`,
                                    width: 1200,
                                    height: 1800
                                  },
                                  enlargedImageContainerDimensions: {
                                    width: '70%',
                                    height: '60%'
                                  }
                                }} />
                              </div>
                          }
                        </div>
                        <div className='mobileImage mb-3'>
                          {
                            imgShow == '' ?
                              <img className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/${SelectedProduct?.images[0]}`} alt="SelectedProduct?.images[0]" /> :
                              <img className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/${imgShow}`} alt="hello" />
                          }
                        </div>
                        <Container>
                          <Row className='mb-2' style={{ marginLeft: `40px` }}>

                            {SelectedProduct?.images?.map((image, index) => {
                              return (

                                <Col className="mx-1" style={{
                                  width: '4rem'
                                }} xs={2} xl={2} lg={4} md={4}>
                                  <img onClick={() => setImgShow(image)} className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/${image}`} alt="hello" />
                                </Col>

                              )
                            })}
                          </Row>
                        </Container>
                      </>
                    }

                  </div>
                  <div className="col-lg-6 col-12  mt-5 mt-lg-0">
                    <div className="product-details " >
                      <h3 className="mb-0">
                        {SelectedProduct.name}
                      </h3>
                      {/* <div className="star-rating mb-4"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                        </div> */}
                      <span className="product-price h4">
                        <span className="product-price">

                          {
                            SelectedProduct.discount > 0 ? SelectedProduct?.discount_type == 'percent' ? <> Discount:{Math.round((SelectedProduct.discount))}%</> : null : null
                          }

                          {
                            SelectedProduct.discount > 0 ? SelectedProduct?.discount_type == 'flat' ? <> Discount:৳{(Math.round((SelectedProduct?.discount) / convert, 2))}</> : null : null
                          }
                        </span><br />
                        <span className="product-price">
                          {
                            SelectedProduct.discount > 0 ? SelectedProduct?.discount_type == 'percent' ? <>৳{Math.round((SelectedProduct?.unit_price / convert) - (SelectedProduct?.unit_price / convert * SelectedProduct?.discount) / 100)}</> : <>৳{(Math.round(SelectedProduct?.unit_price / convert) - ((SelectedProduct?.discount) / convert))}</> : <>৳{Math.round(SelectedProduct?.unit_price / convert)}</>
                          }
                          <span>
                            {
                              SelectedProduct?.discount > 0 ? <del className="text-muted h6"> ৳{Math.round(SelectedProduct?.unit_price / convert)}</del>
                                : null
                            }
                          </span>

                        </span>

                      </span>
                      <ul className="list-unstyled my-4">
                        <li className="mb-2">Availibility: <span className="text-muted"> In Stock({SelectedProduct.current_stock})</span>
                        </li>
                        {/* <li>Categories :<span className="text-muted">  {SelectedProduct.category}</span>
                      </li> */}
                      </ul>
                      {/* <p className="mb-4" ontentEditable='true' dangerouslySetInnerHTML={{ __html: SelectedProduct.details }}></p> */}
                      <div className="d-sm-flex align-items-center mb-3">
                        <div className="d-flex align-items-center mr-sm-4">
                          <button onClick={() => cart <= 1 ? 1 : setCart(cart - 1)} className="btn-product btn-product-up"> <i className="las la-minus" />
                          </button>
                          <input className="form-product" type="number" name="form-product" Value={cart} />
                          <button onClick={() => setCart(cart + 1) > 0} className="btn-product btn-product-down"> <i className="las la-plus" />
                          </button>
                        </div>
                      </div>

                      {/* color & Size */}
                      <div className="d-sm-flex align-items-center mb-3">
                        {SelectedProduct?.choice_options?.map((sizes, index) => {

                          return (
                            <>
                              {
                                sizes.options ? <>
                                  <span className='mr-1' >Size:</span>
                                  <select onChange={onChangeSize} className="custom-select mt-3 mt-sm-0" style={{ width: `70px` }}>
                                    {sizes.options.map((options, index) =>
                                      <option key={index} value={options}>{options}</option>)}
                                  </select>

                                </> : null

                              }
                            </>

                          )

                        }
                        )}
                      </div>

                      <div className="ColorAlien d-sm-flex align-items-center mb-1" >
                        <div className="d-flex text-center ml-sm-4 mt-3 mt-sm-0" id="inputGroupSelect02">
                          {
                            SelectedProduct?.colors == '' ? <>
                            </> : <><span className='mr-3'>Color:</span></>
                          }

                          {SelectedProduct?.colors?.map((color, index) => {

                            return (
                              <>
                                {
                                  color.code ?
                                    <><div className="form-check pl-0 mr-3">
                                      <input type="checkbox" value={color.name} id={`color-filter${index}`} className="form-check-input" checked={selectedColor === color.name}
                                        onChange={onChangeColor} />
                                      <label className="form-check-label" htmlFor={`color-filter${index}`} style={{ background: `${color.code}` }} />
                                    </div></> : null
                                }

                              </>
                            )
                          }
                          )}

                        </div>
                      </div>

                      {/* {contextHolder} */}
                      <div className="d-sm-flex align-items-center mt-5">
                        {
                          SelectedProduct.current_stock > 0 ?

                            <>
                              {!CheckCardItem(SelectedProduct.id) ?
                                <Link onClick={() => AddToCart(SelectedProduct.id, SelectedProduct.name, SelectedProduct.thumbnail, cart, (SelectedProduct.unit_price - productPrice()), selectedColor, selectedSize, productPrice(), SelectedProduct.current_stock,)} className="btn btn-info  mr-sm-4 mb-3 mb-sm-0 mr-2" rel="nofollow" ><i className="las la-shopping-cart " />Add To Cart</Link>
                                :
                                <Link to="/OneStepCheck" onClick={() => AddToCart(SelectedProduct.id, SelectedProduct.name, SelectedProduct.thumbnail, cart, (SelectedProduct.unit_price - productPrice()), selectedColor, selectedSize, productPrice(), SelectedProduct.current_stock)} className="btn btn-info  mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />View Cart</Link>
                              }

                              <Link to="/OneStepCheck" onClick={() => AddToCart(SelectedProduct.id, SelectedProduct.name, SelectedProduct.thumbnail, cart, (SelectedProduct.unit_price - productPrice()), selectedColor, selectedSize, productPrice(), SelectedProduct.current_stock)} className="btn btn-info  mr-sm-4 mb-3 mb-sm-0 mr-2" rel="nofollow" ><i className="las la-shopping-cart " />Buy Now</Link>

                            </>
                            : <Link to="/" className="btn btn-info  mr-sm-4 mb-3 mb-sm-0" rel="nofollow" >Stock Out</Link>
                        }
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
                      <NavLink className={classnames({ active: SelectedTab === '2' })} onClick={() => { toggle('2'); }}>Reviews (2)</NavLink>
                    </NavItem>
                  </Nav>
                  {/* Tab panes */}
                  <TabContent activeTab={SelectedTab} className="pt-5 p-0">
                    <TabPane tabId="1" className="fade show" active>
                      <Row className="align-items-center mb-3">
                        {
                          SelectedProduct?.images[0] ?
                            <div className="col-md-4">
                              <InnerImageZoom className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/${SelectedProduct?.images[0]}`} alt="hello" />
                            </div> : null
                        }
                        {
                          SelectedProduct?.images[1] ?
                            <div className="col-md-4">
                              <InnerImageZoom className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/${SelectedProduct?.images[1]}`} alt="hello" />
                            </div> : null
                        }
                        {
                          SelectedProduct?.images[2] ?
                            <div className="col-md-4">
                              <InnerImageZoom className="img-fluid w-100" src={`${imgUrl}storage/app/public/product/${SelectedProduct?.images[2]}`} alt="hello" />
                            </div> : null
                        }

                      </Row>
                      <Row>
                        <div className="col-md-12 mt-5 mt-lg-0">
                          <h3 className="mb-3">{SelectedProduct.name}</h3>
                          <p className="mb-5" ontentEditable='true' dangerouslySetInnerHTML={{ __html: SelectedProduct.details }}></p>
                          {/* <p className="">{SelectedProduct.details}</p>  */}
                        </div>
                      </Row>
                    </TabPane>

                    <TabPane tabId="2" className="fade show">
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


      </HelmetProvider>
    </>
  )


}

export default productsingle