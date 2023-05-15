import React, { useEffect, useState } from 'react';
import apiClient from '../../api/http-common';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from "react-router-dom";



const colorSearch = () => {
    const [color, setColor] = useState([]);
    const [colorSearch, setColorSearch] = useState([]);
    const history = useHistory();
    useEffect(() => {
        apiClient.get(`v1/products/Color`)
            .then(res => {
                setColor(res.data);
            });
    }, [])

    const colorSubmit = (ColorName) => {

        console.log(ColorName);
        apiClient.get(`v1/products/colorSearch/${ColorName}`)
            .then(res => {
                console.log(res.data)
                history.push("/searchcolor", { color: res.data });
            });
    }
    return (
        <>
            <div className="widget widget-categories mb-4 pb-4 border-bottom">
                <h4 className="widget-title mb-3">Color</h4>
                <Scrollbars style={{ height: 300 }}>
                    {color?.map((color, index) => (
                        <>
                            <div className='container' key={index}>
                                <div className='row mb-1' style={{ backgroundColor: `${color?.code}` }}>
                                    <a onClick={() => colorSubmit(color?.name)} >{color?.name}</a>
                                </div>
                            </div>
                        </>
                    ))}
                </Scrollbars>
            </div>
        </>
    )
}

export default colorSearch


