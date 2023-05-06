import React, { useState, useEffect } from 'react';
import apiuClient from '../../api/http-common';
import { Link } from 'react-router-dom';
import imgUrl from '../../api/baseUrl';
import { Col, Container, Row, Label, FormGroup, Input, Table } from 'reactstrap';

const orderView = () => {
    const [orderView, SetOrderView] = useState([]);

    useEffect(() => {
        apiuClient.get(`/v1/customer/order/list`)
            .then(res => {
                SetOrderView(res.data)
            })
    }, []);
    return (
        <div>
            <div className="page-content">
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
                                                {/* <th scope="col">Action</th> */}
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
                                                            <div className="product-title mb-2">{CartItem.order_amount}</div>
                                                        </div>
                                                    </td>
                                                    {/* <Link to="/">
                                                                    <img className="img-fluid" src={`${imgUrl}storage/product/thumbnail/${CartItem.ProductImage}`} style={{ height: '100px' }} alt="" />
                                                                </Link>
                                                                <div className="media-body ml-3">
                                                                    <div className="product-title mb-2"><Link className="link-title" to="#">{CartItem.ProductName}</Link>
                                                                    </div>
                                                                </div> */}


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
    )
}

export default orderView;
