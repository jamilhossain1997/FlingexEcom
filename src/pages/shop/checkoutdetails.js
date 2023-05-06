import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row, CardBody, CardTitle, CardText, Card } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";
import CheckPlace from './checkPlace';

const checkoutdetails = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [shopCharge, setShopCharge] = useState(JSON.parse(localStorage.getItem("shopping")))
    const [address, setAddress] = useState([]);
    const history = useHistory()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/checkoutdetails');
        } else {
            history.push('/sign-in');
        }
    }, [])

    useEffect(() => {
        apiClient.get(`/v1/customer/address/list`)
            .then(res => {
                console.log(res)
                setAddress(res.data)
                // history.push('/order-complate')
            })
            .catch(err => {
                console.log(err);
            })
    }, [address])




    function GetCartItems() {
        var ItemCart = JSON.parse(localStorage.getItem("CartProduct"));
        if (ItemCart == null) {
            history.push(`/`)
        }
        return ItemCart;
    }

    const Subtotal = (Number(GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) + Number(shopCharge));
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
                        <Row>
                            <div className="col-lg-7 col-md-12">
                                <div className="checkout-form">
                                    <h2 className="mb-4">Billing Details</h2>
                                    <div className="row">
                                        <Card
                                            className="my-2"
                                            color="primary"
                                            outline
                                            style={{
                                                width: '18rem'
                                            }}
                                        >
                                            <CardBody>
                                                {/* <CardTitle tag="h5">
                                                    Special Title Treatment
                                                </CardTitle> */}
                                                <CardText>
                                                    Name: {address.contact_person_name},
                                                    phone:{address.phone},
                                                    Address:{address.address}
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            <CheckPlace address={address.id} />
                        </Row>
                    </Container>
                </section>
            </div>
            {/*body content end*/}
        </>
    )
}

export default checkoutdetails