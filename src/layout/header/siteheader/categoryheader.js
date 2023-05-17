import React, { useEffect, useState } from 'react';
import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Container,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    NavLink,
} from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { useQuery } from 'react-query';
import apiClient from '../../../api/http-common';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from "react-icons/bs";
import { Tooltip } from 'reactstrap';
import imgUrl from '../../../api/baseUrl';


const categoryheader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [brand, setBrand] = useState([]);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/categories`)
            .then(res => {
                setBrand(res.data);
            })
    }, []);


    return (
        <>
            <button className="navbar-toggler d-flex align-items-center text-uppercase bg-info" type="button" onClick={toggle} style={{ background: `#17a2b8!important` }}> <i className="las la-stream" />Categories</button>
            <Modal isOpen={modal} toggle={toggle} className="cart-modal" style={{ float: `left` }}>
                <ModalHeader toggle={toggle} className='text-info'>Categories</ModalHeader>
                <ModalBody className='categories d-block shadow-sm' >
                    <Container >
                        <Row>
                            {brand?.map((branditem) => (
                                <React.Fragment key={branditem.slug}>
                                    <Col xs={12} md={12}>
                                        <Accordion allowZeroExpanded>
                                            <li className='text-info' nav tag="div" ><a href={`/category/${branditem.slug}`} >
                                                <img className='rounded' style={{ maxHeight: "40px", width: "40px" }} src={`${imgUrl}storage/app/public/category/${branditem.icon}`} alt="Sajerbela" />
                                                <span className='m-2 text-info' ><b>{branditem.name}</b></span>
                                            </a>
                                                {branditem?.childes?.map((subcat) => (
                                                    <React.Fragment key={subcat.slug}>
                                                        <ul href={`/category/${subcat.slug}`}>
                                                            <AccordionItem>
                                                                <li className='fs-4 ml-5 text-info'>
                                                                    {
                                                                        subcat.childes.length > 0 ?
                                                                            <AccordionItemHeading>
                                                                                <AccordionItemButton>
                                                                                    <a href={`/category/${subcat.slug}`} className='text-info'>
                                                                                        {subcat.name}
                                                                                    </a>
                                                                                </AccordionItemButton>
                                                                            </AccordionItemHeading> :
                                                                            <a href={`/category/${subcat.slug}`} className='text-info'>
                                                                                {subcat.name}
                                                                            </a>
                                                                    }

                                                                </li>
                                                                <AccordionItemPanel>
                                                                    <ul>
                                                                        {
                                                                            subcat?.childes?.map((subsubcat, i) => (
                                                                                <React.Fragment key={subsubcat.slug}>
                                                                                    <li key={i} style={{ listStyleType: `square` }} className='fs-4 ml-5 text-info' href={`/category/${subsubcat.slug}`}>
                                                                                        <a href={`/category/${subsubcat.slug}`} className='text-info'>
                                                                                            {subsubcat.name}
                                                                                        </a>
                                                                                    </li>
                                                                                </React.Fragment>
                                                                            ))
                                                                        }
                                                                    </ul>
                                                                </AccordionItemPanel>
                                                            </AccordionItem>

                                                        </ul>
                                                    </React.Fragment>
                                                ))}
                                            </li>
                                        </Accordion>
                                        <hr />
                                    </Col>
                                </React.Fragment>
                            ))}
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        </>


    );
}


export default categoryheader;
