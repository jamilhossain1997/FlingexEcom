import React, { useState, useEffect } from 'react'
import { Row, Container } from 'reactstrap';
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
    const { isLoading, error, data } = useQuery('bannerapi', bannerapi);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // console.log(data)


    if (isLoading) return (
        <Skeleton count={1} style={{ height: `300px` }} />
    )

    if (error) return 'An error has occurred: ' + error.message


    return (
        <section className="banner pos-r p-0">
            <OwlCarousel
                className="banner-slider owl-carousel no-pb owl-2"
                dots={false}
                nav
                items={1}
                autoplay={true}
                navText={["<span class='las la-arrow-left'><span></span></span>", "<span class='las la-arrow-right'><span></span></span>"]}
            >
                {/* {
                    data?.map((item, i) => {
                        return (
                            <session>
                                {


                                    item ? <img src={`${imgUrl}/storage/app/public/banner/${item.photo}`} alt='hello' />
                                        : <Skeleton count={1} style={{ height: `300px` }} />

                                }
                            </session>


                        )

                    })
                } */}

                {
                    data?.map((item, i) => {
                        return (
                            <div className="item bg-pos-rt" style={{ backgroundImage: `url(${imgUrl}storage/app/public/banner/${item.photo})`, backgroundSize: `auto`, height: `500px`, backgroundPosition: `center center` }}>
                                <Container className="h-100">
                                    <Row className="h-100 align-items-center">
                                        <div className="col-lg-7 col-md-12 custom-py-1 position-relative z-index-1">
                                            {/* <h6 className="font-w-6 text-primary animated3">Welcome Ekocart</h6> */}
                                            {/* <h1 className="mb-4 animated3">A New Online<br /> Shop experience</h1> */}
                                            {/* <div className="animated3">
                                                <Link className="btn btn-primary btn-animated" to="#">Shop Now</Link>
                                            </div> */}
                                            {/* <div className="hero-circle animated4" /> */}
                                        </div>
                                    </Row>
                                </Container>
                            </div>


                        )

                    })
                }




            </OwlCarousel>
        </section>
    )
}

export default herosection7