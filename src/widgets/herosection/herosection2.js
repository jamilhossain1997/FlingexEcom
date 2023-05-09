import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
window.fn = OwlCarousel;

const bannerapi = async () => {
    const result = await apiClient.get(`/v1/banners?banner_type=main_banner`)
    return result.data;
}

const herosection7 = () => {
    const [banner, SetBanner] = useState([]);
    const [catgory, setCatgory] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const options = {
        loop: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    }

    // const history = useHistory();
    const { isLoading, error, data } = useQuery('bannerapi', bannerapi);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // console.log(data)
    useEffect(() => {
        apiClient.get(`/v1/categories`)
            .then(res => {
                setCatgory(res.data);
            })
    }, []);


    if (isLoading) return (
        <Skeleton count={1} style={{ height: `300px` }} />
    )

    if (error) return 'An error has occurred: ' + error.message


    return (
        <section className="banner pos-r p-0 mb-3">
            <Container fluid>
                <Row>
                    {/* <Col lg={3}>
                        <Navbar className="navbar navbar-expand-lg navbar-light categories d-block shadow-sm" color="faded" light>
                            <button className="navbar-toggler d-flex align-items-center text-uppercase bg-info" type="button" onClick={toggleNavbar}> <i className="las la-stream" />Categories</button>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar vertical>
                                    {
                                        catgory.map((item, i) => (
                                            <>
                                                <UncontrolledDropdown nav inNavbar direction="end" className="dropdown-item" style={{ textTransform: `uppercase` }}>
                                                    {
                                                        item?.childes?.length > 0 ?
                                                            <DropdownToggle nav caret>
                                                                {item.name}
                                                            </DropdownToggle> :
                                                            <DropdownToggle nav >
                                                                {item.name}
                                                            </DropdownToggle>
                                                    }

                                                    {
                                                        item?.childes?.length > 0 ?
                                                            <DropdownMenu direction="end">
                                                                {
                                                                    item?.childes?.map((subcat) => (
                                                                        <DropdownItem>{subcat.name}</DropdownItem>
                                                                    ))
                                                                }
                                                            </DropdownMenu> : null
                                                    }

                                                </UncontrolledDropdown >

                                            </>
                                        ))
                                    }

                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Col> */}
                    <Col lg={12}>
                        <OwlCarousel
                            className="banner-slider owl-carousel no-pb h-100"
                            {...options}
                            dotData="false"
                            margin={5}
                        >
                            {
                                data?.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            {


                                                item ? <Link to={`${item.url}`}><img className='d-block w-100' style={{ maxHeight: `800px` }} src={`${imgUrl}/storage/app/public/banner/${item.photo}`} alt={`${item.url}`} /></Link>
                                                    : <Skeleton count={1} />

                                            }
                                        </div>
                                    )
                                })
                            }
                        </OwlCarousel>
                    </Col>

                </Row>
            </Container>
        </section >
    )
}

export default herosection7