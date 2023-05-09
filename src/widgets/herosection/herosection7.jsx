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
    const { isLoading, error, data } = useQuery('bannerapi', bannerapi);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // console.log(data)


    if (isLoading) return (
        <Skeleton count={1} style={{ height: `300px` }} />
    )

    // if (error) return 'An error has occurred: ' + error.message


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
                {
                    data?.map((item, i) => {
                        return (
                            <div key={i}>
                                {


                                    item ? <Link to={`${item.url}`}><img className='d-block w-100' style={{ maxHeight: `620px` }} src={`${imgUrl}/storage/app/public/banner/${item.photo}`} alt='hello' /></Link>
                                        : <Skeleton count={1} style={{ height: `300px` }} />

                                }
                            </div>
                        )

                    })
                }
            </OwlCarousel>
        </section>
    )
}

export default herosection7