import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row, CardBody, CardTitle, CardText, Card } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";

const checkPlace = (props) => {
    const [address, setAddress] = useState([]);
    const [shopCharge, setShopCharge] = useState(JSON.parse(localStorage.getItem("shopping")))
    const history = useHistory();

    // console.log(add_id)

    function GetCartItems() {
        var ItemCart = JSON.parse(localStorage.getItem("CartProduct"));
        if (ItemCart == null) {
            history.push(`/`)
        }
        return ItemCart;
    }

    const convert = 0.011904761904762;
    const Subtotal = (Number(Math.round(GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert), 2) + Number(shopCharge));
    const onSubmit = () => {
        const add_id = props.address;
        // alert(add_id);

        apiClient.post(`/v1/customer/order/place?address_id=${add_id}`)
            .then(res => {
                console.log(res)
                localStorage.removeItem("CartProduct")
                history.push('/order-complate')
            })
            .catch(err => {
                console.log(err);
            })


    }
    return (
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
                <div className="cart-detail my-5">
                    <h3 className="mb-3">Payment Method</h3>
                    <div className="form-group">
                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="customRadio1">Cach on Delivery</label>
                        </div>
                    </div>
                    {/* <div className="form-group">
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
                    </div> */}
                </div>
                <button className="btn btn-primary btn-animated btn-block" onClick={onSubmit}>Proceed to Payment</button>
            </div>
        </Col>
    )
}

export default checkPlace