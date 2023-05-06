import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";

const checkout = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [shopCharge, setShopCharge] = useState(JSON.parse(localStorage.getItem("shopping")))
  const history = useHistory()
  // const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/checkout');
    } else {
      history.push('/sign-in');
    }
  }, [])


  const onSubmit = data => {

    // apiClient.get(`/v1/customer/order/place`)
    //   .then(res => {
    //     console.log(res)
    //     // history.push('/order-complate')
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    apiClient.post(`/v1/customer/address/add`, data)
      .then(res => {
        console.log(res)
        history.push('/checkoutdetails')
      })
      .catch(err => {
        console.log(err);
      })
  }




  function GetCartItems() {
    var ItemCart = JSON.parse(localStorage.getItem("CartProduct"));
    if (ItemCart == null) {
      history.push(`/`)
    }
    return ItemCart;
  }
  const convert = 0.011904761904762;
  const Subtotal = (Number(Math.round(GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert), 2) + Number(shopCharge));

  return (
    <>
      {/*hero section start*/}
      <section className="bg-light">
        <Pageheading foldername={"Shop"} title={"Product Checkout"} />
      </section>
      {/*hero section end*/}

      {/*body content start*/}
      <div className="page-content">
        <section>
          <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <div className="col-lg-7 col-md-12">
                  <div className="checkout-form">
                    <h2 className="mb-4">Billing Details</h2>
                    <div className="row">
                      <Col md={6}>
                        <div className="form-group">
                          <label>Name</label>
                          <input type="text" {...register("contact_person_name")} className="form-control" placeholder="Your firstname" required />

                        </div>
                      </Col>
                      {/* <Col md={6}>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input type="text" {...register("email")} id="lname" className="form-control" placeholder="Your lastname" required/>

                        </div>
                      </Col> */}
                      {/* <Col md={6}>
                        <div className="form-group">
                          <label>E-mail Address</label>
                          <input type="text" {...register("email")} id="email" className="form-control" placeholder="State Province" required/>

                        </div>
                      </Col> */}
                      <Col md={6}>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input type="number" {...register("phone")} id="phone" className="form-control" placeholder required />

                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="form-group">
                          <label>Address Type </label>
                          <div className="form-field"> <i className="icon icon-arrow-down3" />
                            <select {...register("address_type")} className="form-control" required>
                              <option value="Home">Home</option>
                              <option value="Alaska">OFFICE</option>
                            </select>

                          </div>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="form-group">
                          <label>City</label>
                          <input type="text" {...register("city")} className="form-control" placeholder="Town or City" required />

                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="form-group">
                          <label>Address</label>
                          <input type="text" {...register("address")} className="form-control" placeholder="Enter Your Address" required />

                        </div>
                        {/* <div className="form-group">
                          <input type="text" id="address2" className="form-control" placeholder="Second Address" />

                        </div> */}
                      </Col>

                      <Col md={6}>
                        <div className="form-group mb-md-0">
                          <label>zip code </label>
                          <input type="text" {...register("zip")} className="form-control" placeholder="zip code" />

                        </div>
                      </Col>
                      {/* <Col md={6}>
                        <div className="form-group mb-md-0">
                          <label>Zip/Postal Code</label>
                          <input type="text" id="zippostalcode" className="form-control" placeholder="Zip / Postal" />
                        </div>
                      </Col> */}
                    </div>
                  </div>
                </div>
                <Col lg={5} md={12} className="mt-5 mt-lg-0">
                  <div className="shadow p-3 p-lg-5">
                    <div className="p-3 p-lg-5 shadow-sm mb-5">
                      <label className="text-black mb-3">Enter your coupon code if you have one</label>
                      <div className="input-group">
                        <input className="form-control" id="c-code" placeholder="Coupon Code" aria-label="Coupon Code" aria-describedby="button-addon2" type="text" />
                        <div className="input-group-append">
                          <button className="btn btn-primary btn-sm px-4" type="button" id="button-addon2">Apply</button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 p-lg-5 shadow-sm mb-5">
                      <h3 className="mb-3">Your Order</h3>
                      {(GetCartItems() != null && GetCartItems().length > 0) ?
                        <ul className="list-unstyled">
                          {GetCartItems().map((CartItem, index) => (
                            <li className="mb-3 border-bottom pb-3"><span> {CartItem.Qty} x {CartItem.ProductName} </span> ৳ {Math.round((CartItem.Rate * CartItem.Qty).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}</li>
                          ))}
                          <li className="mb-3 border-bottom pb-3"><span> Shipping </span> ৳ {shopCharge}</li>

                          <li className="mb-3 border-bottom pb-3"><span> Subtotal </span> ৳{Subtotal} </li>
                          <li><span><strong className="cart-total"> Total :</strong></span>  <strong className="cart-total">৳{Subtotal}</strong>
                          </li>
                        </ul>
                        : <div>No Items found</div>
                      }
                    </div>
                    {/* <div className="cart-detail my-5">
                      <h3 className="mb-3">Payment Method</h3>
                      <div className="form-group">
                        <div className="custom-control custom-radio">
                          <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                          <label className="custom-control-label" htmlFor="customRadio1">Direct Bank Tranfer</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-radio">
                          <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                          <label className="custom-control-label" htmlFor="customRadio2">Check Payment</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-radio">
                          <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input" />
                          <label className="custom-control-label" htmlFor="customRadio3">Paypal Account</label>
                        </div>
                      </div>
                      <div className="form-group mb-0">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1">I have read and accept the terms and conditions</label>
                        </div>
                      </div>
                    </div> */}
                    <button className="btn btn-primary btn-animated btn-block">Proceed to Payment</button>
                  </div>
                </Col>
              </Row>
            </form>
          </Container>
        </section>
      </div>
      {/*body content end*/}
    </>
  )
}

export default checkout