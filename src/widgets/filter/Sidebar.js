import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import apiClient from '../../api/http-common';
import { Link } from 'react-router-dom';
import SidebarBrand from './SidebarBrand';
import PriceSearch from '../../pages/shop/layout/grid/PriceSearch';
import Price from '../../pages/shop/layout/grid/price';
import ColorSearch from './colorSearch';
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';


const Sidebar = () => {

    const [category, setCategory] = useState([]);


    useEffect(() => {
        apiClient.get(`/v1/categories`)
            .then(res => {
                setCategory(res.data)
            });
    }, [])
    return (
        <>
            <div className="shadow-sm p-3">
                <div className="widget widget-categories mb-4 pb-4 border-bottom">
                    <h4 className="widget-title mb-3">Categories</h4>
                    <Scrollbars style={{ height: 300 }}>
                        {category?.map((cate, index) => (
                            <>
                                <div className='container' key={index}>
                                    <div className='row'>
                                        <a href={`/category/${cate.slug}`} className='text-info'>
                                            <li>{cate?.name}</li>
                                        </a>
                                    </div>
                                </div>
                            </>
                        ))}
                    </Scrollbars>
                </div>
                <div className="widget widget-brand mb-4 pb-4 border-bottom">
                    <h4 className="widget-title mb-3">Brand</h4>
                    <SidebarBrand />
                </div>

                <Price />
                <ColorSearch />

            </div>
        </>
    )
}

export default Sidebar

