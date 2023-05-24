import React, { useEffect, useState } from 'react'
import {
    TabContent, TabPane, Nav, NavItem,
    NavLink, Card, Button, Modal, ModalHeader,
    ModalBody, Row, Col, Container,
    CardBody, CardText, CardSubtitle, CardTitle,
    CardHeader, ListGroup, ListGroupItem
} from 'reactstrap';
import apiClient from '../../../../api/http-common';
import imgUrl from "../../../../api/baseUrl";
import { Link, useParams } from 'react-router-dom';
// /v1/categories / 486
const subCategory = () => {
    const [category, setCategory] = useState([]);
    const { id } = useParams();

    console.log(id);
    useEffect(() => {
        apiClient.get(`/v1/categories/${id}`)
            .then(res => {
                setCategory(res.data)
                setLoading(false)
            })
    }, []);

    return (
        <div>
            <Container className='mt-5'>
                <Row>
                    {
                        category?.map((item) =>
                            <Col sm="6 mb-2">
                                <Card body>
                                    <CardTitle tag="h5">
                                        <Link to={`/category/${item.slug}`}>{item.name}</Link>
                                    </CardTitle>
                                    <CardText>
                                        {
                                            item?.childes?.map((childItem) =>
                                                <>
                                                    <ul className='ml-2'>
                                                        <li className='ml-2 list-style-square'><Link to={`/category/${childItem.slug}`}>{childItem.name}</Link></li>
                                                    </ul>
                                                </>
                                            )
                                        }
                                    </CardText>
                                </Card>
                            </Col>
                        )
                    }


                </Row>
            </Container>
        </div>
    )
}

export default subCategory
