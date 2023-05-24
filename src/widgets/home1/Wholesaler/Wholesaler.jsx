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
import WholesalerCat from './wholesalerCat';

const Wholesaler = () => {

    const [cat, setCat] = useState([]);


    useEffect(() => {
        apiClient.get(`/v1/categories`)
            .then((res) => {
                setCat(res.data);
                // console.log(res.data)
            }

            )
    }, [])
    return (
        <>
            <Container fluid>
                <Row>
                    <div className='col-md-4 mb-2'>
                        <Card body>
                            <Card
                                style={{
                                    width: '22rem'
                                }}
                            >
                                <CardHeader>
                                    All Categories
                                </CardHeader>
                                <ListGroup flush>
                                    {
                                        cat?.map((catory) =>
                                            <ListGroupItem >
                                                <Link to={`/subCategory/${catory.id}`}>
                                                    <img className='rounded' style={{ maxHeight: "40px", width: "40px" }} src={`${imgUrl}storage/app/public/category/${catory.icon}`} alt="Sajerbela" />
                                                    <span style={{ textTransform: `lowercase` }}>{catory.name}</span>
                                                </Link>

                                            </ListGroupItem>
                                        )
                                    }

                                </ListGroup>
                            </Card>
                        </Card>
                    </div>
                    <div className='col-md-8 mb-2'>
                        <WholesalerCat />
                    </div>

                </Row>
            </Container>

        </>
    )
}

export default Wholesaler
