import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/http-common';

const SidebarBrand = () => {
    const [brand, setBrand] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/brands`)
            .then(res => {
                setBrand(res.data);
            })
    }, []);
    return (
        <>
            <div className="custom-control custom-checkbox mb-2">
                {
                    brand?.map((cate, index) => (
                        <>
                            <div className='container' key={index}>
                                <div className='row'>
                                    <a className='text-info' href={`/grid-left-sidebar/${cate.id}`}>
                                        {/* <input type="checkbox" onClick={(e) => this.CategoryFilter(e, categoryFilterValues)} value={cate} defaultChecked={categoryFilterValues.includes(cate) ? true : false} className="custom-control-input" id={cate} /> */}
                                        <li > {cate?.name}</li>
                                    </a>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </>
    )
}

export default SidebarBrand