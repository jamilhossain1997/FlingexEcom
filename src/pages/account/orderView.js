import React, { useState, useEffect } from 'react';
import apiuClient from '../../api/http-common';
import { Link } from 'react-router-dom';
import imgUrl from '../../api/baseUrl';
import { Col, Container, Row, Label, FormGroup, Input, Table } from 'reactstrap';
import UserMenu from './User/UserMenu';
import Pageheading from '../../widgets/pageheading';

const orderView = () => {
    const [orderView, SetOrderView] = useState([]);

    useEffect(() => {
        apiuClient.get(`/v1/customer/order/list`)
            .then(res => {
                SetOrderView(res.data)
                // console.log(res.data)
            })
    }, []);

    const convert = 0.011904761904762;

    return (
        <div>
            <section className="bg-light">
                <Pageheading foldername={"Order"} title={"My Order View"} />
            </section>
            <div className="page-content">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <UserMenu />
                        </div>
                        <div className='col-md-8'>
                            <section>
                                <Container>
                                    {
                                        orderView ? <Row>
                                            <div className="table-responsive">
                                                <Table
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Order#</th>
                                                            <th scope="col">Order Date</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Total</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderView?.map((CartItem, index) => (

                                                            <tr>
                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <div className="product-title mb-2">{CartItem.id}</div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <div className="product-title mb-2">{CartItem.created_at}</div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <div className="product-title mb-2">{CartItem.order_status}</div>
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <div className="product-title mb-2">৳{Math.round(CartItem.order_amount / convert)}</div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <Link to={`/invoice/${CartItem.id}`}>
                                                                            <i className="las la-eye" />
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Row>
                                            :
                                            <Row>
                                                <Col md={12} className="text-center pb-11">
                                                    <h3 className="mb-4">Your order is Currently Empty.</h3>
                                                    <Link className="btn btn-primary mr-3" to="/">Homes</Link>
                                                    <Link className="btn btn-primary" to="/grid-left-sidebar">Continue Shoppings</Link>

                                                </Col>
                                            </Row>
                                    }

                                </Container>
                            </section>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default orderView;
