import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Label, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pageheading from '../../widgets/pageheading';
import { useHistory } from 'react-router-dom';
import imgUrl from '../../api/baseUrl';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";



const cart = () => {


  const [prodata, setProdata] = useState(JSON.parse(localStorage.getItem("CartProduct")));
  const history = useHistory();
  const [shopping, setShopping] = useState('');

  useEffect(() => {
    localStorage.setItem('shopping', JSON.stringify(shopping));
  }, [shopping]);

  const [shopCharge, setShopCharge] = useState(JSON.parse(localStorage.getItem("shopping")))

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/cart');
      // window.location.reload(1)
      // location.reload()
    } else {
      history.push('/sign-in');
    }
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // useEffect(() => {
  //   const product = prodata.find((item) => item)
  //   console.log(product.ProductID);
  //   let cat = {
  //     product_id: product?.ProductID,
  //     color: product?.productColor,
  //     choices: product?.Productchoices,
  //     variations: product?.Productvariations,
  //     variant: product?.Productvariant,
  //     quantity: product?.ProductID,
  //     price: product?.Rate,
  //     thumbnail: product?.ProductImage
  //   }

  //   apiClient.post(`/v1/cart/add`, cat)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })

  // }, [])

  const prductSubmit = () => {
    const product = prodata.find((item) => item)
    console.log(product.ProductID);
    let cat = {
      id: product?.ProductID,
      product_id: product?.ProductID,
      shipping_cost: shopCharge,
      discount: product?.discount && 0,
      // color: "",
      choices: [],
      variations: [],
      // variant: "",
      quantity: product?.Qty,
      price: product?.Rate,
      thumbnail: product?.ProductImage
    }
    console.log(cat)
    apiClient.post(`/v1/cart/add`, cat)
      .then(res => {
        console.log(res.data);
        history.push('/checkout')
        // history.push('/checkout')
      })
      .catch(err => {
        console.log(err);
        alert('places Pages Reload')
      })
  }





  function GetCartItems() {
    return JSON.parse(localStorage.getItem("CartProduct"));
  }
  const RemoveItem = (Index) => {
    var CartValue = JSON.parse(localStorage.getItem("CartProduct"));
    CartValue = CartValue.slice(0, Index).concat(CartValue.slice(Index + 1, CartValue.length));
    localStorage.removeItem("CartProduct");
    localStorage.setItem("CartProduct", JSON.stringify(CartValue));
  }

  const AddQty = (Index) => {
    var CartValue = JSON.parse(localStorage.getItem("CartProduct"));
    CartValue[Index].Qty = parseInt(CartValue[Index].Qty + 1);
    localStorage.removeItem("CartProduct");
    localStorage.setItem("CartProduct", JSON.stringify(CartValue));
  }

  const RemoveQty = (Index) => {
    var CartValue = JSON.parse(localStorage.getItem("CartProduct"));

    if (CartValue[Index].Qty != 1) {

      CartValue[Index].Qty = parseInt(CartValue[Index].Qty - 1);
      localStorage.removeItem("CartProduct");
      localStorage.setItem("CartProduct", JSON.stringify(CartValue));
    } else {
      RemoveItem(Index);
    }
  }

  // function refreshPage() {
  //   window.location.reload();
  // }

  const convert = 0.011904761904762;
  return (
    <>
      {/*hero section start*/}
      <section className="bg-light">
        <Pageheading foldername={"shop"} title={"Product Cart"} />
      </section>
      {/*hero section end*/}
      {/*body content start*/}
      <div className="page-content" >
        <section>
          <Container>
            {(GetCartItems() != null && GetCartItems().length > 0) ?
              <Row>

                <div className="col-lg-8">
                  <div className="table-responsive">
                    <table className="cart-table table">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Name</th>
                          <th scope="col">price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {GetCartItems().map((CartItem, index) => (
                          <tr>


                            <td>
                              <img className="img-fluid" src={`${imgUrl}storage/app/public/product/thumbnail/${CartItem.ProductImage}`} style={{ height: '100px' }} alt="" />
                            </td>
                            {/* <Link to="/">
                                </Link> */}
                            <td>
                              <div className="media-body ml-3">
                                <div className="product-title mb-2"><Link className="link-title" to="#">{CartItem.ProductName}</Link>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="media-body ml-3">
                                <div className="product-title mb-2"><Link className="link-title" to="#">{Math.round((CartItem.Rate) / convert, 2)}</Link>
                                </div>
                              </div>
                            </td>


                            {/* <td> <span className="product-price text-muted">
                              ${CartItem.Rate.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert}
                            </span>
                            </td> */}
                            <td>
                              <div className="d-flex justify-content-center align-items-center">
                                <Link className="btn-product btn-product-up" onClick={() => RemoveQty(index)}> <i className="las la-minus" />
                                </Link>
                                <input className="form-product" type="number" name="form-product" value={CartItem.Qty} />
                                <Link className="btn-product btn-product-down" onClick={() => AddQty(index)}> <i className="las la-plus" />
                                </Link>
                              </div>
                            </td>
                            <td> <span className="product-price text-dark font-w-6">
                              ৳{Math.round((CartItem.Rate * CartItem.Qty).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}
                            </span>
                              <Link type="submit" className="btn btn-primary btn-sm" onClick={() => RemoveItem(index)}><i className="las la-times" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <FormGroup>
                    <Label for="exampleSelect">
                      Shipping Cost
                    </Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"

                      onChange={e => setShopping(e.target.value)}
                    >

                      <option>
                        --Select--
                      </option>
                      <option value="2" onChange={e => setShopping(e.target.value)}>
                        Dhaka-60
                      </option>
                      <option value="3" onChange={e => setShopping(e.target.value)}>
                        Inside-Dhaka-120
                      </option>
                    </Input>
                  </FormGroup>

                  <div className="d-md-flex align-items-end justify-content-between border-top pt-5">
                    <div>
                      <label className="text-black h4" htmlFor="coupon">Coupon</label>
                      <p>Enter your coupon code if you have one.</p>
                      <Row className="form-row">
                        <Col>
                          <input className="form-control" id="coupon" placeholder="Coupon Code" type="text" />
                        </Col>
                        <div className="col col-auto">
                          <button className="btn btn-dark btn-animated">Apply Coupon</button>
                        </div>
                      </Row>
                    </div>
                    {/* <button className="btn btn-primary btn-animated mt-3 mt-md-0">Update Cart</button> */}
                  </div>
                </div>
                <div className="col-lg-4 pl-lg-5 mt-8 mt-lg-0">
                  <div className="shadow rounded p-5">
                    <h4 className="text-black text-center mb-2">Cart Totals</h4>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-3"> <span className="text-muted">Subtotal</span>
                      <span className="text-dark">৳{Math.round((GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-3"> <span className="text-muted">Tax</span>  <span className="text-dark">$00.00</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-3 mb-5"> <span className="text-dark h5">Total</span>
                      <span className="text-dark">৳{Math.round((GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)}</span>
                    </div>
                    <button className="btn btn-primary btn-animated btn-block" onClick={prductSubmit} >Proceed To Checkout</button>
                    <Link className="btn btn-dark btn-animated mt-3" to="/discontproduct">Continue Shopping</Link>
                  </div>
                </div>

              </Row>
              :
              <Row>
                <Col md={12} className="text-center pb-11">
                  <h3 className="mb-4">Your cart is Currently Empty.</h3>
                  <Link className="btn btn-primary mr-3" to="/">Homes</Link>
                  <Link className="btn btn-primary" to="/discontproduct">Continue Shoppings</Link>

                </Col>
              </Row>
            }
          </Container>
        </section>
      </div>
      {/*body content end*/}
    </>
  );
}

export default cart