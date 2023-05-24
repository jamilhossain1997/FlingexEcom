import React, { useEffect, useState } from 'react'
import {
    TabContent, TabPane, Nav, NavItem,
    NavLink, Card, Button, Modal, ModalHeader,
    ModalBody, Row, Col, Container,
    CardBody, CardText, CardSubtitle, CardTitle,
    CardHeader, ListGroup, ListGroupItem
} from 'reactstrap';

import apiClient from "../../../api/http-common";
import imgUrl from "../../../api/baseUrl";
import { Link } from 'react-router-dom';


const wholesalerCat = () => {
    const [allseller, setAllseller] = useState([]);
    useEffect(() => {
        apiClient.get(`v1/seller/all`)
            .then((res) => {
                setAllseller(res.data);
                console.log(res.data)
            }

            )
    }, [])

    return (
        <div>
            <Card body>
                <Row>
                    {
                        allseller?.map((item) =>
                            <div className='col-md-6 mb-2'>
                                <Card body>
                                    <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/shop/${item.image}`} />
                                    <CardTitle tag="h6" style={{ fontSize: `13px` }}>
                                        {item.name}<br />
                                        {item.address}<br />
                                    </CardTitle>
                                    <Button>
                                        <Link to={`/seller_shop/${item.id}`}>View Seller Product</Link>
                                    </Button>
                                </Card>
                            </div>
                        )
                    }


                </Row>

            </Card>
        </div>
    )
}

export default wholesalerCat
