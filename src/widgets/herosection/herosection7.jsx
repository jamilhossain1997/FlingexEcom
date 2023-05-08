import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Collapse } from 'reactstrap';
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
    const toggle = () => setIsOpen(!isOpen);
    console.log(toggle);
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
                    <Col lg={3}>
                        <nav className="navbar navbar-expand-lg navbar-light categories d-block shadow-sm">
                            <button className="navbar-toggler d-flex align-items-center text-uppercase" type="button" data-toggle="collapse" data-target="#categoriesDropdown" aria-controls="categoriesDropdown" aria-expanded="false" aria-label="Toggle navigation" onClick={toggle}> <i className="las la-stream" />Categories</button>
                            <Collapse isOpen={isOpen} >

                                <ul className="navbar-nav d-block w-100">

                                    {
                                        catgory?.map((item, i) =>
                                            <li className="nav-item" key={i}> <Link className="nav-link" to="#">{item.name}</Link>
                                            </li>
                                        )
                                    }
                                </ul>

                            </Collapse>
                        </nav>
                    </Col>
                    <Col lg={9}>
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
        </section>
    )
}

export default herosection7